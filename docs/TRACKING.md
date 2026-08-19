# Tracking Architecture V1

## Acquisition sources

Normalize these source groups:

- `facebook`
- `google`
- `seo`
- `direct`
- `referral`
- `other`

## UTM capture

Capture on landing:

```text
utm_source
utm_medium
utm_campaign
utm_content
utm_term
```

The frontend stores first-touch UTM values in `sessionStorage` under a versioned key and includes both first-touch and current last-touch UTM context in client analytics events. This does not change the existing `/api/leads` attribution contract; extending the database to store separate first/last-touch attribution is a later data-model change.

## Event taxonomy V1

```text
hero_cta_clicked
calculator_started
calculator_completed
lead_form_started
lead_form_step_completed
lead_phone_reached
lead_submitted
mobile_sticky_cta_impression
mobile_sticky_cta_click
```

Recommended event properties:

- `event_version`
- page/path
- section
- `cta_id` where applicable
- device
- first-touch UTM values
- last-touch UTM values
- calculator version/result context
- property type where relevant
- `lead_id` only after successful submission

Never send raw phone numbers, email addresses, names, access tokens, API keys or other secrets into client analytics events. Lead Score remains server-side Sales Intelligence and is never exposed in customer-facing analytics.

## Funnel definitions

```text
hero_cta_clicked
    -> calculator_started
    -> calculator_completed
    -> lead_form_started
    -> lead_form_step_completed
    -> lead_phone_reached
    -> lead_submitted
```

Primary business conversion:

- `lead_submitted`

Business conversions are recorded server-side later:

- `qualified`
- `survey`
- `quoted`
- `won`
- `revenue_recorded`

## Reporting chain

```text
Traffic -> Engagement -> Lead -> Qualified -> Survey -> Quote -> Won -> Revenue
```

This enables CPL, CPQL, CPA, conversion rate, ROAS and CAC calculations once cost and revenue data are available.

## Consent and privacy

Analytics/advertising integrations must respect the site's consent requirements and local applicable law. Server logs must avoid unnecessary PII.
