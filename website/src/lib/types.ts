export interface Country {
  code: string;
  name: string;
  region: "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";
  income_level: "Low" | "Lower-middle" | "Upper-middle" | "High";
}

export type ServiceStatus = "available" | "partial" | "unavailable" | "unknown";
export type ConfidenceLevel = "low" | "medium" | "high";
export type ServiceTier = "Foundation" | "Essential";
export type DPGMaturity = "Mature" | "Emerging" | "Gap";

export interface Source {
  title: string;
  url: string;
  type: "primary" | "secondary" | "dpg_registry";
  accessed: string;
}

export interface CountryServiceData {
  country_code: string;
  country_name: string;
  service_id: string;
  status: ServiceStatus;
  confidence: ConfidenceLevel;
  summary: string;
  year_assessed: number;
  sources: Source[];
  notes: string;
  dpgs_deployed: string[];
}

export interface ServiceDefinition {
  id: string;
  name: string;
  number: number;
  tier: ServiceTier;
  description: string;
  dpg_maturity: DPGMaturity;
}

export interface DPG {
  name: string;
  url: string;
  description: string;
  maturity: "Mature" | "Emerging" | "Early";
  countries_deployed: string[];
}

export interface FrontierService {
  id: string;
  number: number;
  name: string;
  description: string;
  exemplars: { country: string; description: string }[];
}
