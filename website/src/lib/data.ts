import fs from "fs";
import path from "path";
import { Country, CountryServiceData, DPG } from "./types";
import { services } from "./services";

const DATA_DIR = path.join(process.cwd(), "..", "data");

export function getCountries(): Country[] {
  const filePath = path.join(DATA_DIR, "countries.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getCountryServiceData(
  serviceId: string,
  countryCode: string
): CountryServiceData | null {
  const filePath = path.join(
    DATA_DIR,
    "services",
    serviceId,
    "countries",
    `${countryCode}.json`
  );
  if (!fs.existsSync(filePath)) return null;
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getAllCountryDataForService(
  serviceId: string
): CountryServiceData[] {
  const countriesDir = path.join(
    DATA_DIR,
    "services",
    serviceId,
    "countries"
  );
  if (!fs.existsSync(countriesDir)) return [];
  const files = fs.readdirSync(countriesDir).filter((f) => f.endsWith(".json"));
  return files.map((f) =>
    JSON.parse(fs.readFileSync(path.join(countriesDir, f), "utf-8"))
  );
}

export function getDPGsForService(serviceId: string): DPG[] {
  const filePath = path.join(DATA_DIR, "services", serviceId, "dpgs.json");
  if (!fs.existsSync(filePath)) return [];
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

export function getTrackerMatrix(): {
  countries: Country[];
  matrix: Record<string, Record<string, CountryServiceData | null>>;
} {
  const countries = getCountries();
  const matrix: Record<string, Record<string, CountryServiceData | null>> = {};

  for (const country of countries) {
    matrix[country.code] = {};
    for (const service of services) {
      matrix[country.code][service.id] =
        getCountryServiceData(service.id, country.code);
    }
  }

  return { countries, matrix };
}

export function getServiceStats(serviceId: string): {
  available: number;
  partial: number;
  unavailable: number;
  unknown: number;
  total: number;
} {
  const countries = getCountries();
  const data = getAllCountryDataForService(serviceId);
  const dataMap = new Map(data.map((d) => [d.country_code, d]));

  let available = 0,
    partial = 0,
    unavailable = 0,
    unknown = 0;

  for (const country of countries) {
    const d = dataMap.get(country.code);
    if (!d || d.status === "unknown") unknown++;
    else if (d.status === "available") available++;
    else if (d.status === "partial") partial++;
    else if (d.status === "unavailable") unavailable++;
  }

  return {
    available,
    partial,
    unavailable,
    unknown,
    total: countries.length,
  };
}
