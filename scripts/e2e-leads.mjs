import { Pool } from 'pg';

const baseUrl = process.env.E2E_BASE_URL ?? 'http://127.0.0.1:3000';
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is required for the Lead API E2E test');
}

const pool = new Pool({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false },
});

const phone = `090${Date.now().toString().slice(-8)}`;
const payload = {
  name: 'E2E Solar Lead',
  phone,
  propertyType: 'factory',
  monthlyBill: 12_000_000,
  roofAreaM2: 120,
  solarType: 'hybrid',
  calculatorUsed: true,
  attribution: {
    utm_source: 'facebook',
    utm_medium: 'paid_social',
    utm_campaign: 'e2e-lead-test',
    utm_content: 'e2e',
    utm_term: 'solar',
    landingPage: '/e2e-lead-test',
    referrer: 'https://www.facebook.com/',
  },
};

async function postLead(body) {
  const response = await fetch(`${baseUrl}/api/leads`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await response.json();
  return { response, json };
}

try {
  const table = await pool.query(
    "select 1 from information_schema.tables where table_schema = 'public' and table_name = 'leads'",
  );
  if (table.rowCount !== 1) throw new Error('public.leads table does not exist');

  const invalid = await postLead({ ...payload, phone: 'not-a-phone' });
  if (invalid.response.status !== 400) {
    throw new Error(`Validation test failed: expected 400, got ${invalid.response.status}`);
  }

  const created = await postLead(payload);
  if (created.response.status !== 201) {
    throw new Error(`Lead creation failed: expected 201, got ${created.response.status}: ${JSON.stringify(created.json)}`);
  }

  const expectedScore = 92;
  if (created.json.lead?.lead_score !== expectedScore) {
    throw new Error(`Lead Score mismatch: expected ${expectedScore}, got ${created.json.lead?.lead_score}`);
  }
  if (created.json.lead?.lead_temperature !== 'hot') {
    throw new Error(`Lead temperature mismatch: expected hot, got ${created.json.lead?.lead_temperature}`);
  }

  const persisted = await pool.query(
    `select name, phone, property_type, monthly_bill, roof_area_m2, solar_type,
            calculator_used, lead_score, lead_temperature, scoring_version,
            source, utm_source, utm_medium, utm_campaign, utm_content, utm_term,
            landing_page, referrer
       from leads
      where phone = $1
      order by created_at desc
      limit 1`,
    [phone],
  );

  if (persisted.rowCount !== 1) throw new Error('Persist test failed: lead was not found in PostgreSQL');

  const row = persisted.rows[0];
  const checks = [
    ['name', row.name === payload.name],
    ['phone', row.phone === phone],
    ['property_type', row.property_type === payload.propertyType],
    ['monthly_bill', Number(row.monthly_bill) === payload.monthlyBill],
    ['roof_area_m2', Number(row.roof_area_m2) === payload.roofAreaM2],
    ['solar_type', row.solar_type === payload.solarType],
    ['calculator_used', row.calculator_used === true],
    ['lead_score', Number(row.lead_score) === expectedScore],
    ['lead_temperature', row.lead_temperature === 'hot'],
    ['scoring_version', row.scoring_version === 'lead_scoring_v1'],
    ['source', row.source === 'facebook'],
    ['utm_source', row.utm_source === 'facebook'],
    ['utm_medium', row.utm_medium === 'paid_social'],
    ['utm_campaign', row.utm_campaign === 'e2e-lead-test'],
    ['utm_content', row.utm_content === 'e2e'],
    ['utm_term', row.utm_term === 'solar'],
    ['landing_page', row.landing_page === '/e2e-lead-test'],
    ['referrer', row.referrer === 'https://www.facebook.com/'],
  ];

  const failed = checks.filter(([, ok]) => !ok).map(([field]) => field);
  if (failed.length) throw new Error(`Persisted data mismatch: ${failed.join(', ')}`);

  console.log('E2E PASS: validation=400, create=201, score=92/hot, attribution persisted, lead persisted in PostgreSQL');
} finally {
  await pool.query('delete from leads where phone = $1', [phone]).catch(() => undefined);
  await pool.end();
}
