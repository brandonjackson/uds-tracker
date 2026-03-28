import { ServiceDefinition, FrontierService } from "./types";

export const services: ServiceDefinition[] = [
  {
    id: "01-digital-identity",
    name: "Digital Identity",
    number: 1,
    tier: "Foundation",
    description:
      "Prove your identity online to access government services, apply for credentials, and verify identity with consent.",
    dpg_maturity: "Mature",
  },
  {
    id: "02-civil-registration",
    name: "Civil Registration",
    number: 2,
    tier: "Foundation",
    description:
      "Register births, deaths, and marriages digitally and receive certified documents.",
    dpg_maturity: "Mature",
  },
  {
    id: "03-digital-payments",
    name: "Digital Payments",
    number: 3,
    tier: "Foundation",
    description:
      "Receive government payments, pay fees and taxes online, and transfer money via national payment rails.",
    dpg_maturity: "Emerging",
  },
  {
    id: "04-health-records",
    name: "Health Records",
    number: 4,
    tier: "Foundation",
    description:
      "View medical records online, share with providers, check vaccination history, and receive notifications.",
    dpg_maturity: "Mature",
  },
  {
    id: "05-population-registry",
    name: "Population Registry",
    number: 5,
    tier: "Foundation",
    description:
      "Be counted in a national register, update personal details, and obtain proof of residency.",
    dpg_maturity: "Emerging",
  },
  {
    id: "06-social-protection",
    name: "Social Protection",
    number: 6,
    tier: "Essential",
    description:
      "Check benefit eligibility, apply for social programmes, and track application status online.",
    dpg_maturity: "Emerging",
  },
  {
    id: "07-tax-administration",
    name: "Tax Administration",
    number: 7,
    tier: "Essential",
    description:
      "File tax returns, calculate liability, pay taxes, and manage taxpayer profile online.",
    dpg_maturity: "Gap",
  },
  {
    id: "08-land-property-registry",
    name: "Land & Property",
    number: 8,
    tier: "Essential",
    description:
      "Search land ownership, register property, transfer titles, and download official deeds digitally.",
    dpg_maturity: "Emerging",
  },
  {
    id: "09-education-platform",
    name: "Education Platform",
    number: 9,
    tier: "Essential",
    description:
      "Enrol in school, access learning materials, view results, and download verified credentials online.",
    dpg_maturity: "Mature",
  },
  {
    id: "10-business-registration",
    name: "Business Registration",
    number: 10,
    tier: "Essential",
    description:
      "Register a business, apply for licences, file compliance documents, and search the business register.",
    dpg_maturity: "Emerging",
  },
  {
    id: "11-electoral-services",
    name: "Electoral Services",
    number: 11,
    tier: "Essential",
    description:
      "Register to vote, check registration status, view candidates and results, and apply for postal votes.",
    dpg_maturity: "Gap",
  },
  {
    id: "12-justice-legal-aid",
    name: "Justice & Legal Aid",
    number: 12,
    tier: "Essential",
    description:
      "Check legal aid eligibility, apply for representation, track cases, and file claims online.",
    dpg_maturity: "Gap",
  },
  {
    id: "13-agricultural-extension",
    name: "Agricultural Extension",
    number: 13,
    tier: "Essential",
    description:
      "Get personalised farming advice, check market prices, apply for subsidies, and receive weather advisories.",
    dpg_maturity: "Emerging",
  },
  {
    id: "14-public-procurement",
    name: "Public Procurement",
    number: 14,
    tier: "Essential",
    description:
      "Find and bid on government contracts, track procurement, and view awarded contracts transparently.",
    dpg_maturity: "Mature",
  },
  {
    id: "15-immigration-travel",
    name: "Immigration & Travel",
    number: 15,
    tier: "Essential",
    description:
      "Apply for passports and visas, check application status, and manage travel documents online.",
    dpg_maturity: "Gap",
  },
];

export const frontierServices: FrontierService[] = [
  {
    id: "16-ai-augmented-delivery",
    number: 16,
    name: "AI-Augmented Public Service Delivery",
    description:
      "AI tools that transform how citizens access government services — spanning citizen-facing advisors, professional copilots, and decision support.",
    exemplars: [
      {
        country: "United Kingdom",
        description:
          "i.AI programme: GOV.UK AI Helpers for career guidance, Caddy copilot for Citizens Advice (halved response times), Lex for legislation search (700+ users).",
      },
      {
        country: "Estonia",
        description:
          "Proactive services framework that automatically identifies citizen entitlements and initiates delivery without applications.",
      },
    ],
  },
  {
    id: "17-personalised-public-health",
    number: 17,
    name: "Personalised Public Health Advisor",
    description:
      "Preventive, proactive health guidance tailored to individual risk profiles; AI-assisted diagnostics and triage.",
    exemplars: [
      {
        country: "United Kingdom",
        description:
          "NHS AI Diagnostic Fund covering one-third of chest X-rays (2.4M scans) with AI-assisted reads.",
      },
      {
        country: "Rwanda",
        description:
          "Babylon Health partnership for AI-powered triage.",
      },
      {
        country: "India",
        description:
          "Aarogya Setu for pandemic response and health advisory.",
      },
    ],
  },
  {
    id: "18-climate-disaster-warning",
    number: 18,
    name: "Climate & Disaster Early Warning",
    description:
      "Localised alerts, evacuation routing, and resilience planning tools for climate and natural disasters.",
    exemplars: [
      {
        country: "Bangladesh",
        description:
          "Cyclone Preparedness Programme with digital alert layer.",
      },
      {
        country: "India",
        description:
          "IFLOWS-Mumbai flood prediction system.",
      },
    ],
  },
  {
    id: "19-participatory-budgeting",
    number: 19,
    name: "Participatory Budgeting Platform",
    description:
      "Citizen proposal, deliberation, and allocation of public funds through digital platforms.",
    exemplars: [
      {
        country: "Brazil",
        description:
          "Porto Alegre — digital evolution of the original participatory budgeting model.",
      },
      {
        country: "Spain",
        description:
          "Barcelona's Decidim — open-source platform now used by 150+ cities globally.",
      },
      {
        country: "Taiwan",
        description:
          "Join platform for public deliberation and policy consultation.",
      },
    ],
  },
  {
    id: "20-skills-labour-matching",
    number: 20,
    name: "Skills & Labour Market Matching",
    description:
      "Training recommendations, job matching, and credential portability powered by data and AI.",
    exemplars: [
      {
        country: "Singapore",
        description:
          "MySkillsFuture — personalised skills and career guidance.",
      },
      {
        country: "India",
        description:
          "PMKVY digital platform for skills certification.",
      },
      {
        country: "United Kingdom",
        description:
          "AI Helpers pilot targeting employment transitions and apprenticeship matching.",
      },
    ],
  },
];

export const foundationServices = services.filter(
  (s) => s.tier === "Foundation"
);
export const essentialServices = services.filter(
  (s) => s.tier === "Essential"
);
