import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type LifeStage = {
  stage: string;
  services: {
    title: string;
    category: string;
    tier: "Foundation" | "Essential" | "Frontier";
    number: number;
  }[];
};

const timeline: LifeStage[] = [
  {
    stage: "Born",
    services: [
      {
        title: "Register a birth and receive a birth certificate",
        category: "Civil Registration",
        tier: "Foundation",
        number: 2,
      },
    ],
  },
  {
    stage: "Growing up",
    services: [
      {
        title: "Enrol a child in primary or secondary school",
        category: "Education Platform",
        tier: "Essential",
        number: 9,
      },
    ],
  },
  {
    stage: "Becoming a citizen",
    services: [
      {
        title: "Apply for a national ID card or digital identity credential",
        category: "Digital Identity",
        tier: "Foundation",
        number: 1,
      },
      {
        title: "Apply for a passport or renew an existing passport",
        category: "Immigration & Travel",
        tier: "Essential",
        number: 14,
      },
      {
        title: "Register to vote in national or local elections",
        category: "Electoral Services",
        tier: "Essential",
        number: 11,
      },
    ],
  },
  {
    stage: "Earning a living",
    services: [
      {
        title: "Find and apply for skills training or career guidance",
        category: "Skills & Labour Market Matching",
        tier: "Frontier",
        number: 20,
      },
      {
        title: "File your annual tax return online",
        category: "Tax Administration",
        tier: "Foundation",
        number: 5,
      },
      {
        title: "Register a new business or company",
        category: "Business Registration",
        tier: "Essential",
        number: 10,
      },
      {
        title: "Get personalised advice on crops and farm management",
        category: "Agricultural Extension",
        tier: "Essential",
        number: 13,
      },
    ],
  },
  {
    stage: "Settling down",
    services: [
      {
        title: "Register a marriage or civil partnership",
        category: "Civil Registration",
        tier: "Foundation",
        number: 2,
      },
      {
        title: "Register ownership of land or property",
        category: "Land & Property Registry",
        tier: "Essential",
        number: 8,
      },
    ],
  },
  {
    stage: "Getting help",
    services: [
      {
        title: "Check which benefits or social programmes you are eligible for",
        category: "Social Protection",
        tier: "Essential",
        number: 6,
      },
      {
        title: "Receive a government payment into your account",
        category: "Digital Payments",
        tier: "Foundation",
        number: 3,
      },
      {
        title: "Find out if you are eligible for free legal aid",
        category: "Justice & Legal Aid",
        tier: "Essential",
        number: 12,
      },
      {
        title: "Report a crime",
        category: "Policing & Public Safety",
        tier: "Essential",
        number: 15,
      },
    ],
  },
  {
    stage: "Staying healthy",
    services: [
      {
        title: "Get AI-powered guidance navigating government services",
        category: "AI-Augmented Public Service Delivery",
        tier: "Frontier",
        number: 16,
      },
      {
        title: "Get personalised health advice based on your risk profile",
        category: "Personalised Public Health Advisor",
        tier: "Frontier",
        number: 17,
      },
    ],
  },
  {
    stage: "End of life",
    services: [
      {
        title: "Register a death and receive a death certificate",
        category: "Civil Registration",
        tier: "Foundation",
        number: 2,
      },
      {
        title: "Receive a survivor\u2019s benefit or pension transfer",
        category: "Social Protection",
        tier: "Essential",
        number: 6,
      },
    ],
  },
];

// Top Digital Public Good for each service (by service number)
const topDpg: Record<number, string> = {
  1: "MOSIP",
  2: "OpenCRVS",
  3: "Mojaloop",
  6: "OpenSPP",
  8: "SOLA",
  9: "Sunbird",
  10: "eRegistrations",
  13: "Digital Green",
};

function getDpgLabel(serviceNumber: number): { label: string; isGap: boolean } {
  const dpg = topDpg[serviceNumber];
  if (dpg) return { label: dpg, isGap: false };
  if (serviceNumber >= 16) return { label: "At the frontier", isGap: true };
  return { label: "Gap", isGap: true };
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[var(--green)] text-white py-12 lg:py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider mb-3 opacity-80">
            Our Vision
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight mb-4">
            Everyone deserves brilliant digital services from their government. By 2035.
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl mb-8 opacity-90">
            AI is supercharging the speed of software — making this a once-in-a-generation chance to level up public services worldwide. The UDS Tracker maps the gaps and champions who's closing them.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/tracker"
              className="bg-[var(--black)] hover:bg-[#383f43] text-white px-5 py-3 font-bold text-sm no-underline inline-block shadow-[inset_0_-3px_0_#000] hover:shadow-[inset_0_-3px_0_#1a1a1a]"
            >
              Explore the Tracker
            </Link>
            <Link
              href="/about"
              className="bg-white text-[var(--black)] hover:bg-[var(--light-grey)] px-5 py-3 font-bold text-sm no-underline inline-block shadow-[inset_0_-3px_0_#929191]"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-10">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--black)] mb-2">
            Accessible services, from cradle to grave.
          </h2>
          <p className="text-[var(--dark-grey)] mb-6 max-w-2xl leading-relaxed">
            Every person should be able to access the government services they
            need at every stage of life &mdash; digitally, simply, and without
            corruption or delay.
          </p>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[15px] sm:left-[19px] top-0 bottom-0 w-[2px] bg-[var(--border-grey)]" />

            {timeline.map((stage, stageIdx) => (
              <div key={stageIdx} className="mb-10 last:mb-0">
                {/* Stage heading */}
                <div className="relative flex items-center gap-4 mb-4">
                  <div className="w-[32px] sm:w-[40px] flex-shrink-0 flex items-center justify-center relative z-10">
                    <div className="w-3 h-3 rounded-full bg-[var(--black)] ring-4 ring-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--black)] uppercase tracking-wider">
                    {stage.stage}
                  </h3>
                </div>

                {/* Services in this stage */}
                <div className="space-y-3">
                  {stage.services.map((service, serviceIdx) => {
                    const { label: dpgLabel, isGap } = getDpgLabel(service.number);
                    return (
                      <div
                        key={serviceIdx}
                        className="relative flex items-start gap-4"
                      >
                        <div className="w-[32px] sm:w-[40px] flex-shrink-0 flex items-center justify-center pt-3 relative z-10">
                          <div
                            className="w-2.5 h-2.5 rounded-full bg-[var(--green)] ring-4 ring-white"
                          />
                        </div>
                        <div className="border border-[var(--border-grey)] p-4 flex-1 bg-white">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <p className="text-[var(--black)] font-bold leading-snug">
                              {service.title}
                            </p>
                            <span
                              className={`text-[11px] font-bold uppercase tracking-wider px-1.5 py-0.5 flex-shrink-0 ${
                                isGap
                                  ? "bg-[var(--light-grey)] text-[var(--dark-grey)] italic"
                                  : "bg-[var(--green-light)] text-[var(--green)]"
                              }`}
                            >
                              {dpgLabel}
                            </span>
                          </div>
                          <p className="text-sm text-[var(--dark-grey)] mt-1">
                            {service.category}{" "}
                            <span className="text-[var(--mid-grey)]">
                              &middot; Service {service.number}
                            </span>
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
