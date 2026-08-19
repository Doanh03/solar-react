import { NextResponse } from 'next/server';
import { getAttributionFromSearch } from '@/app/lib/attribution';
import { getDb } from '@/app/lib/db';
import { scoreLead } from '@/app/lib/lead-scoring';

export const runtime = 'nodejs';

type LeadRequest = {
  name?: unknown;
  phone?: unknown;
  propertyType?: unknown;
  monthlyBill?: unknown;
  roofAreaM2?: unknown;
  solarType?: unknown;
  calculatorUsed?: unknown;
  attribution?: {
    utm_source?: unknown;
    utm_medium?: unknown;
    utm_campaign?: unknown;
    utm_content?: unknown;
    utm_term?: unknown;
    landingPage?: unknown;
    referrer?: unknown;
  };
};

const propertyTypes = new Set(['home', 'factory', 'office', 'shop', 'farm']);
const solarTypes = new Set(['grid-tied', 'hybrid', 'battery']);

function asString(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function asFiniteNumber(value: unknown): number | null {
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : null;
}

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  let body: LeadRequest;

  try {
    body = (await request.json()) as LeadRequest;
  } catch {
    return badRequest('Request body must be valid JSON');
  }

  const name = asString(body.name);
  const phone = asString(body.phone);
  const propertyType = asString(body.propertyType);
  const solarType = asString(body.solarType);
  const monthlyBill = asFiniteNumber(body.monthlyBill);
  const roofAreaM2 = asFiniteNumber(body.roofAreaM2);
  const calculatorUsed = body.calculatorUsed === true;

  if (!name || name.length < 2 || name.length > 120) return badRequest('Invalid name');
  if (!phone || !/^(?:\+84|0)\d{8,10}$/.test(phone.replace(/[ .-]/g, ''))) return badRequest('Invalid phone number');
  if (!propertyType || !propertyTypes.has(propertyType)) return badRequest('Invalid property type');
  if (!solarType || !solarTypes.has(solarType)) return badRequest('Invalid solar type');
  if (monthlyBill === null || monthlyBill < 0 || monthlyBill > 1_000_000_000) return badRequest('Invalid monthly bill');
  if (roofAreaM2 === null || roofAreaM2 < 1 || roofAreaM2 > 10_000) return badRequest('Invalid roof area');

  const attributionInput = body.attribution ?? {};
  const attribution = getAttributionFromSearch(
    new URLSearchParams(
      Object.entries(attributionInput)
        .filter(([, value]) => typeof value === 'string')
        .map(([key, value]) => [key, value as string]),
    ).toString(),
    asString(attributionInput.landingPage) ?? '/',
    asString(attributionInput.referrer) ?? '',
  );

  const score = scoreLead({
    monthlyBill,
    propertyType: propertyType as 'home' | 'factory' | 'office' | 'shop' | 'farm',
    roofAreaM2,
    solarType: solarType as 'grid-tied' | 'hybrid' | 'battery',
    calculatorUsed,
    phoneProvided: true,
  });

  try {
    const result = await getDb().query(
      `insert into leads (
        name, phone, property_type, monthly_bill, roof_area_m2, solar_type,
        calculator_used, lead_score, lead_temperature, score_reasons, scoring_version,
        source, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
        landing_page, referrer, attribution_captured_at
      ) values (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10::jsonb, $11,
        $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) returning id, lead_score, lead_temperature, created_at`,
      [
        name,
        phone.replace(/[ .-]/g, ''),
        propertyType,
        monthlyBill,
        roofAreaM2,
        solarType,
        calculatorUsed,
        score.score,
        score.temperature,
        JSON.stringify(score.reasons),
        score.version,
        attribution.source,
        attribution.utm_source ?? null,
        attribution.utm_medium ?? null,
        attribution.utm_campaign ?? null,
        attribution.utm_content ?? null,
        attribution.utm_term ?? null,
        attribution.landingPage ?? null,
        attribution.referrer ?? null,
        attribution.capturedAt,
      ],
    );

    return NextResponse.json(
      { lead: result.rows[0] },
      { status: 201 },
    );
  } catch (error) {
    console.error('lead_persistence_failed', error instanceof Error ? error.message : 'unknown error');
    return NextResponse.json({ error: 'Lead could not be saved' }, { status: 503 });
  }
}
