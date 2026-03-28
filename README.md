# Universal Digital Services Tracker

By 2035, every person on earth should have access to 15 essential digital public services.

The UDS Tracker is a public good: a website, a dataset, and a research infrastructure that tracks which of 15 Foundation and Essential digital services are available in every UN member state.

## Project Structure

```
uds-tracker/
├── website/          # Next.js static website
├── data/             # Research data (source of truth)
│   ├── services/     # One folder per service (15 services)
│   │   └── XX-name/
│   │       ├── definition.md
│   │       ├── countries/    # One JSON per country
│   │       ├── dpgs.json     # Related digital public goods
│   │       └── exemplars.md
│   ├── frontier/     # Frontier service descriptions
│   ├── countries.json
│   └── research-status.json
└── agents/           # Claude Code agent prompts
    ├── research-agent.md
    ├── audit-agent.md
    └── upgrade-agent.md
```

## Services Tracked

### Foundation (1-5)
1. Digital Identity
2. Civil Registration
3. Digital Payments
4. Health Records
5. Population Registry

### Essential (6-15)
6. Social Protection
7. Tax Administration
8. Land & Property Registry
9. Education Platform
10. Business Registration
11. Electoral Services
12. Justice & Legal Aid
13. Agricultural Extension
14. Public Procurement
15. Immigration & Travel

## Development

```bash
cd website
npm install
npm run build:data   # Generate tracker data from JSON files
npm run dev          # Start development server
npm run build        # Static export
```

## Data Model

Each country-service entry is a JSON file:

```json
{
  "country_code": "GBR",
  "country_name": "United Kingdom",
  "service_id": "01-digital-identity",
  "status": "available|partial|unavailable|unknown",
  "confidence": "low|medium|high",
  "summary": "...",
  "year_assessed": 2026,
  "sources": [{ "title": "...", "url": "...", "type": "primary", "accessed": "..." }],
  "notes": "...",
  "dpgs_deployed": []
}
```

## Improving Data with Claude Code Agents

The `agents/` directory contains three prompt templates for systematically improving data quality using Claude Code. Each prompt can be pasted as context or referenced when asking Claude to work on the dataset.

### Research Agent — Fill gaps with new country data

Use `agents/research-agent.md` to populate country data files that don't exist yet.

**Single country, single service:**
> Read agents/research-agent.md for instructions. Research digital identity services in Japan and create data/services/01-digital-identity/countries/JPN.json.

**Multiple countries, single service:**
> Read agents/research-agent.md. Research digital payments for FRA, DEU, JPN, KOR, SGP and create their JSON files in data/services/03-digital-payments/countries/.

**All countries in a region:**
> Read agents/research-agent.md. Read data/countries.json, filter for region "Africa", and research service 02-civil-registration for every African country. Create a JSON file for each.

**Full service sweep:**
> Read agents/research-agent.md. Research service 06-social-protection for ALL countries in data/countries.json that don't already have a file in data/services/06-social-protection/countries/. Work through them in batches.

### Audit Agent — Check data quality

Use `agents/audit-agent.md` to validate existing data files for schema compliance, source quality, and consistency.

**Audit one service:**
> Read agents/audit-agent.md. Audit all country files in data/services/01-digital-identity/countries/. Check schema, flag short summaries, and identify entries where status is "available" but confidence is "low".

**Audit everything:**
> Read agents/audit-agent.md. Audit all country data files across all 15 services. Print a summary of errors and warnings.

### Upgrade Agent — Improve confidence levels

Use `agents/upgrade-agent.md` to find primary sources for low-confidence entries and upgrade them to medium.

**Upgrade one service:**
> Read agents/upgrade-agent.md. Find all low-confidence entries in data/services/03-digital-payments/countries/ and try to upgrade them to medium by finding primary government sources.

**Upgrade across all services:**
> Read agents/upgrade-agent.md. Scan all 15 services for low-confidence entries. Prioritize entries with status "available" or "partial" (they have claims that need verification). Upgrade as many as possible.

### Make Everything Better

To do a full-cycle improvement pass across the entire dataset:

> I want to improve the UDS Tracker dataset. Here's what I need, in order:
>
> 1. Read agents/audit-agent.md and audit all existing data files across all 15 services. Tell me what's missing and what needs fixing.
> 2. Read agents/research-agent.md and fill in the biggest gaps — prioritize Foundation services (01-05) and countries with no data at all.
> 3. Read agents/upgrade-agent.md and upgrade any low-confidence entries to medium where you can find primary sources.
> 4. After all changes, rebuild the site: cd website && npm run build
> 5. Commit and push the results.

### Tips for scaling

- **Parallelize by service**: Ask Claude to launch multiple agents in parallel, one per service
- **Batch by region**: "Research all 15 services for Southeast Asian countries"
- **Iterate**: Research first (fill gaps) → Audit (check quality) → Upgrade (improve confidence)
- **Rebuild after changes**: Run `cd website && npm run build` to regenerate the static site with new data

## License

Data: CC BY 4.0 | Code: MIT
