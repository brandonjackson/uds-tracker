import fs from "fs";
import path from "path";

const DATA_DIR = path.join(__dirname, "..", "..", "data");
const OUTPUT = path.join(
  __dirname,
  "..",
  "src",
  "app",
  "tracker",
  "trackerData.generated.json"
);

const services = [
  "01-digital-identity",
  "02-civil-registration",
  "03-digital-payments",
  "04-health-records",
  "05-population-registry",
  "06-social-protection",
  "07-tax-administration",
  "08-land-property-registry",
  "09-education-platform",
  "10-business-registration",
  "11-electoral-services",
  "12-justice-legal-aid",
  "13-agricultural-extension",
  "14-public-procurement",
  "15-immigration-travel",
];

function main() {
  const countriesFile = path.join(DATA_DIR, "countries.json");
  if (!fs.existsSync(countriesFile)) {
    console.error("countries.json not found at", countriesFile);
    process.exit(1);
  }
  const countries = JSON.parse(fs.readFileSync(countriesFile, "utf-8"));
  const matrix: Record<string, Record<string, unknown>> = {};

  for (const country of countries) {
    matrix[country.code] = {};
    for (const serviceId of services) {
      const filePath = path.join(
        DATA_DIR,
        "services",
        serviceId,
        "countries",
        `${country.code}.json`
      );
      if (fs.existsSync(filePath)) {
        matrix[country.code][serviceId] = JSON.parse(
          fs.readFileSync(filePath, "utf-8")
        );
      }
    }
  }

  fs.writeFileSync(OUTPUT, JSON.stringify({ countries, matrix }, null, 0));
  console.log(`Built tracker data: ${countries.length} countries`);
}

main();
