# UDS Tracker Research Agent

## Purpose
Systematically research and populate country-level data for a specific digital service across multiple countries.

## Inputs
- **Service ID:** e.g., `01-digital-identity`
- **Country codes:** list of ISO 3166-1 alpha-3 codes, or "all" for all 193 UN member states
- **Data directory:** `../data/services/{service-id}/countries/`

## Workflow

For each country in the input list:

1. **Research the service** using web search:
   - Search for: `{country name} digital {service name} government online`
   - Search for: `{country name} {service name} e-government`
   - Search for: `{country name} {service name} DPG deployment`
   - Look for government websites, official portals, and service endpoints

2. **Assess status** based on findings:
   - `available`: Citizens can complete the service end-to-end digitally. A PDF form alone does NOT qualify.
   - `partial`: Some digital capability exists but significant gaps remain (geographic, functional, or population coverage).
   - `unavailable`: No digital service exists; analogue only.
   - `unknown`: Cannot determine from available sources.

3. **Assign confidence level:**
   - `low`: Only AI-generated research, no primary source confirmed
   - `medium`: At least one primary source (government website, official report, DPG deployment record) found and verified
   - `high`: Multiple corroborating sources, data verified within last 12 months

4. **Write the JSON file** at `../data/services/{service-id}/countries/{COUNTRY_CODE}.json`:

```json
{
  "country_code": "GBR",
  "country_name": "United Kingdom",
  "service_id": "01-digital-identity",
  "status": "available",
  "confidence": "medium",
  "summary": "Concise description of the digital service, who provides it, and key facts.",
  "year_assessed": 2026,
  "sources": [
    {
      "title": "Descriptive title of the source",
      "url": "https://actual-verified-url.example.com",
      "type": "primary",
      "accessed": "2026-03-28"
    }
  ],
  "notes": "Additional context, caveats, or observations.",
  "dpgs_deployed": ["MOSIP"]
}
```

## Quality Rules

1. **Never invent a source.** If you cannot find a verifiable URL, set confidence to "low."
2. **Never fabricate a URL.** Use only URLs you have actually visited or are confident exist.
3. **Prefer primary sources:** government websites > donor/DPG deployment records > news articles > Wikipedia.
4. **If unsure, default to "unknown" status and "low" confidence.** It's better to admit ignorance than guess.
5. **Always include at least one source.** Even for "unknown" status, cite where you looked.
6. **Check for DPG deployments.** Reference the dpgs.json file for the service to check if any DPGs are known to be deployed in the country.
7. **Be specific in summaries.** Include the name of the system, portal, or programme. Include scale data if available (users, coverage %).

## Example Run

```
Service: 01-digital-identity
Countries: GBR, IND, EST, NGA, BRA

Processing GBR...
  - Searching: "United Kingdom digital identity government online"
  - Found: GOV.UK One Login (https://www.sign-in.service.gov.uk/)
  - Status: available | Confidence: medium
  - Writing: data/services/01-digital-identity/countries/GBR.json

Processing IND...
  - Searching: "India digital identity government online"
  - Found: Aadhaar (https://uidai.gov.in/)
  - Status: available | Confidence: medium
  - DPGs: MOSIP
  - Writing: data/services/01-digital-identity/countries/IND.json

... (continue for all countries)
```

## Post-Run

After completing all countries, update `../data/research-status.json` with the counts for the service.
