# UDS Tracker Upgrade Agent

## Purpose
Target Low-confidence entries and attempt to find primary sources to upgrade them to Medium confidence.

## Inputs
- **Service ID:** e.g., `01-digital-identity` (or "all")
- **Data directory:** `../data/services/{service-id}/countries/`

## Workflow

1. **Scan for Low-confidence entries:**
   - Read all country JSON files for the service
   - Filter for entries where `confidence` is `"low"`
   - Prioritize by status: `available` and `partial` entries are higher priority (they have a status claim that needs verification)

2. **For each Low-confidence entry:**
   - Read the current summary and sources
   - Perform targeted web searches to find primary sources:
     - Government ministry/department websites
     - Official digital service portals
     - DPG deployment records and case studies
     - World Bank / UN agency reports
   - For "unknown" status entries, also search to determine if a status can be assigned

3. **Upgrade criteria (Low → Medium):**
   - At least one primary source (government website or official report) must be found
   - The source must corroborate the status claim
   - The source URL must be real and accessible
   - The summary must be updated to reflect the verified information

4. **Update the JSON file:**
   - Change `confidence` from `"low"` to `"medium"`
   - Add new sources to the `sources` array
   - Update `summary` with more specific, verified information
   - Update `accessed` dates on sources
   - If the search reveals the status should change, update `status` as well

5. **If upgrade fails:**
   - Leave confidence as "low"
   - Add a note: "Upgrade attempted [date]: unable to find primary sources"
   - Do NOT fabricate sources to achieve an upgrade

## Quality Rules

1. Only upgrade if a genuine primary source is found. No fabrication.
2. Prefer government URLs over third-party reports.
3. If a search reveals the current status is wrong, correct it.
4. Always add the new source to the sources array (don't replace existing sources).
5. Update research-status.json after processing.

## Post-Run

Update `../data/research-status.json` with revised confidence counts for the service.
