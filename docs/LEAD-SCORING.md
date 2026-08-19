# Lead Scoring V1

Scoring is a prioritization aid, not a claim that a customer will buy. Sales should be able to see why a score was assigned.

## Base rules

| Signal | Points |
|---|---:|
| Monthly bill >= 10m VND | +25 |
| Monthly bill 5m-<10m | +18 |
| Monthly bill 2m-<5m | +10 |
| Monthly bill <2m | +3 |
| Roof area >= 100m2 | +20 |
| Roof area 50-<100m2 | +14 |
| Roof area 25-<50m2 | +8 |
| Hybrid/battery selected | +15 |
| Business/factory property | +10 |
| Calculator completed | +5 |
| Quote requested | +10 |

Score is capped at 100.

## Temperature

- 80-100: HOT
- 50-79: WARM
- 0-49: COLD

## Important implementation rule

The score must be calculated from a versioned ruleset, e.g. `lead_scoring_v1`. Store the ruleset version with the lead so historical reports remain reproducible when the rules change.

## Future improvements

After enough real conversion data exists, evaluate the rules statistically. Do not claim an AI score or predictive probability before there is sufficient labeled historical data.
