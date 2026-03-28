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

## License

Data: CC BY 4.0 | Code: MIT
