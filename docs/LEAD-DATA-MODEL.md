# Lead Data Model

The model is designed for attribution, qualification and downstream CRM integration without coupling the website to a specific CRM vendor.

## Lead

```text
lead_id                 immutable public-safe identifier
name                    optional until final form step
phone                   normalized phone
email                   optional
province                location
property_type           home | shop | office | factory | farm | other
monthly_bill_vnd        estimated monthly electricity bill
roof_area_m2            estimated usable roof area
solar_type              on_grid | hybrid | battery | undecided
calculator_used         boolean
calculator_result_json  versioned estimate snapshot
lead_score              integer 0-100
lead_temperature       hot | warm | cold
lead_status             new | contacted | qualified | survey | quoted | won | lost
assigned_to             nullable sale user id
created_at
updated_at
```

## Attribution

```text
first_touch_source
first_touch_medium
first_touch_campaign
first_touch_content
first_touch_term
last_touch_source
last_touch_medium
last_touch_campaign
last_touch_content
last_touch_term
landing_page
referrer
```

UTM values are captured on first visit and preserved for later form submission. Last-touch values are updated on subsequent tracked sessions.

## Event model

Track conversion events separately from the lead record:

```text
page_view
calculator_started
calculator_completed
lead_form_started
lead_step_completed
lead_submitted
hotline_clicked
quote_requested
```

Events should use an anonymous/session identifier where possible. Do not put phone numbers or other unnecessary PII into analytics event payloads.

## Lead lifecycle

```text
NEW -> CONTACTED -> QUALIFIED -> SURVEY -> QUOTED -> WON
                                      \-> LOST
```

Status changes should be timestamped in a future `lead_status_history` table so sales velocity can be measured.

## CRM boundary

The website owns lead capture and validation. A CRM integration should consume a stable lead payload and return an external CRM identifier. The website must not hard-code a vendor-specific schema into public UI components.
