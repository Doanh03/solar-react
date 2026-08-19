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

Persist first-touch values for the session/visitor and pass both first-touch and last-touch attribution into the lead record.

## Core events

```text
page_view
view_solution
calculator_started
calculator_completed
lead_form_started
lead_step_completed
lead_submitted
hotline_clicked
quote_requested
```

Recommended event properties:

- page/path
- source/medium/campaign
- calculator result version
- property type
- lead score only after submission

Never send raw phone numbers, email addresses, access tokens, API keys or other secrets into client analytics events.

## Conversion definitions

Primary:

- `lead_submitted`
- `quote_requested`
- `hotline_clicked`

Business conversions are recorded server-side later:

- `qualified`
- `survey`
- `quoted`
- `won`
- `revenue_recorded`

## Reporting chain

```text
Traffic -> Lead -> Qualified -> Survey -> Quote -> Won -> Revenue
```

This enables CPL, CPQL, CPA, conversion rate, ROAS and CAC calculations once cost and revenue data are available.

## Consent and privacy

Analytics/advertising integrations must respect the site's consent requirements and local applicable law. Server logs must avoid unnecessary PII.
