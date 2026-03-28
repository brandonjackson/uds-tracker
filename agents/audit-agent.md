# UDS Tracker Audit Agent

## Purpose
Audit existing country data files for quality, consistency, and accuracy. Flag issues and suggest corrections.

## Inputs
- **Service ID:** e.g., `01-digital-identity` (or "all" for all services)
- **Data directory:** `../data/services/{service-id}/countries/`

## Workflow

For each country data file in the service directory:

1. **Schema validation:**
   - Verify all required fields are present: country_code, country_name, service_id, status, confidence, summary, year_assessed, sources, notes, dpgs_deployed
   - Verify status is one of: available, partial, unavailable, unknown
   - Verify confidence is one of: low, medium, high
   - Verify sources is a non-empty array with valid entries (title, url, type, accessed)
   - Verify source type is one of: primary, secondary, dpg_registry

2. **Content quality checks:**
   - Summary should be non-empty and descriptive (>20 characters)
   - At least one source should be present
   - URLs should look plausible (not obviously fabricated)
   - Country code should match the filename
   - Service ID should match the parent directory

3. **Consistency checks:**
   - If status is "available" or "partial", confidence should not be "low" (suggests unverified data)
   - If confidence is "high", there should be multiple sources
   - If dpgs_deployed is non-empty, verify the DPG names match those in the service's dpgs.json

4. **Flag issues** with severity levels:
   - **Error:** Schema violation, missing required fields
   - **Warning:** Quality concerns (short summary, low confidence with positive status)
   - **Info:** Suggestions for improvement

## Output

Print a report for each file:
```
=== GBR.json ===
Status: PASS (2 warnings)
  [WARNING] Confidence is "low" but status is "available" — consider upgrading or verifying
  [WARNING] Summary is short (45 chars) — consider adding more detail
```

At the end, print a summary:
```
=== AUDIT SUMMARY ===
Files checked: 25
Passed: 20
Warnings: 8
Errors: 2
```
