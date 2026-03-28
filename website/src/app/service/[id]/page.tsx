import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";
import { getAllCountryDataForService, getDPGsForService, getServiceStats } from "@/lib/data";
import type { CountryServiceData, ServiceStatus, ConfidenceLevel } from "@/lib/types";
import Link from "next/link";

const statusColors: Record<ServiceStatus, string> = {
  available: "bg-[var(--status-available)] text-white",
  partial: "bg-[var(--status-partial)] text-white",
  unavailable: "bg-[var(--status-unavailable)] text-white",
  unknown: "bg-[var(--mid-grey)] text-white",
};

const tierColors = {
  Foundation: "bg-[var(--green-light)] text-[var(--green)]",
  Essential: "bg-[#fde8d6] text-[#6f3500]",
};

const dpgMaturityColors = {
  Mature: "bg-[var(--green-light)] text-[var(--green)]",
  Emerging: "bg-[#fde8d6] text-[#6f3500]",
  Gap: "bg-[#f6d7d2] text-[var(--status-unavailable)]",
};

export function generateStaticParams() {
  return services.map((s) => ({ id: s.id }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = services.find((s) => s.id === id);
  if (!service) {
    return <div>Service not found</div>;
  }

  const stats = getServiceStats(service.id);
  const countryData = getAllCountryDataForService(service.id);
  const dpgs = getDPGsForService(service.id);

  const byStatus = (status: ServiceStatus) =>
    countryData.filter((d) => d.status === status);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[var(--light-grey)] border-b border-[var(--border-grey)] py-8">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
              className="text-[var(--link-green)] text-sm underline"
            >
              Home
            </Link>
            <span className="text-[var(--mid-grey)]">/</span>
            <span className="text-[var(--dark-grey)] text-sm">Services</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-3xl font-mono text-[var(--green)] font-bold opacity-50">
              {String(service.number).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-bold px-2 py-0.5 ${tierColors[service.tier]}`}
                >
                  {service.tier}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 ${dpgMaturityColors[service.dpg_maturity]}`}
                >
                  DPG: {service.dpg_maturity}
                </span>
              </div>
              <h1 className="text-3xl font-bold text-[var(--black)]">{service.name}</h1>
              <p className="text-[var(--dark-grey)] mt-2 max-w-2xl leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b border-[var(--border-grey)] py-6">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox
              label="Available"
              value={stats.available}
              color="text-[var(--status-available)]"
            />
            <StatBox
              label="Partial"
              value={stats.partial}
              color="text-[var(--status-partial)]"
            />
            <StatBox
              label="Unavailable"
              value={stats.unavailable}
              color="text-[var(--status-unavailable)]"
            />
            <StatBox
              label="Unknown"
              value={stats.unknown}
              color="text-[var(--mid-grey)]"
            />
            <StatBox
              label="Total Countries"
              value={stats.total}
              color="text-[var(--black)]"
            />
          </div>
          <div className="mt-4 h-3 bg-[var(--light-grey)] overflow-hidden flex">
            <div
              className="bg-[var(--status-available)] h-full"
              style={{
                width: `${(stats.available / stats.total) * 100}%`,
              }}
            />
            <div
              className="bg-[var(--status-partial)] h-full"
              style={{
                width: `${(stats.partial / stats.total) * 100}%`,
              }}
            />
            <div
              className="bg-[var(--status-unavailable)] h-full"
              style={{
                width: `${(stats.unavailable / stats.total) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[var(--black)] mb-4">
              Country Data
            </h2>

            {countryData.length === 0 ? (
              <div className="bg-[var(--light-grey)] p-8 text-center">
                <p className="text-[var(--dark-grey)]">
                  No country data has been collected for this service yet.
                </p>
                <p className="text-[var(--mid-grey)] text-sm mt-2">
                  All {stats.total} countries are currently marked as
                  &ldquo;unknown.&rdquo;
                </p>
              </div>
            ) : (
              <div className="space-y-0 border border-[var(--border-grey)]">
                {countryData
                  .sort((a, b) => {
                    const order: Record<string, number> = {
                      available: 0,
                      partial: 1,
                      unavailable: 2,
                      unknown: 3,
                    };
                    return (
                      (order[a.status] || 3) - (order[b.status] || 3)
                    );
                  })
                  .map((d) => (
                    <CountryRow key={d.country_code} data={d} />
                  ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {dpgs.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-[var(--black)] mb-3">
                  Digital Public Goods
                </h3>
                <div className="space-y-0 border border-[var(--border-grey)]">
                  {dpgs.map((dpg) => (
                    <div
                      key={dpg.name}
                      className="p-4 border-b border-[var(--border-grey)] last:border-b-0"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-bold text-sm">{dpg.name}</h4>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 ${
                            dpg.maturity === "Mature"
                              ? "bg-[var(--green-light)] text-[var(--green)]"
                              : dpg.maturity === "Emerging"
                              ? "bg-[#fde8d6] text-[#6f3500]"
                              : "bg-[var(--light-grey)] text-[var(--dark-grey)]"
                          }`}
                        >
                          {dpg.maturity}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--dark-grey)] mt-1">
                        {dpg.description}
                      </p>
                      {dpg.url && (
                        <a
                          href={dpg.url}
                          className="text-xs text-[var(--link-green)] underline mt-2 inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on DPGA Registry
                        </a>
                      )}
                      {dpg.countries_deployed.length > 0 && (
                        <p className="text-[10px] text-[var(--mid-grey)] mt-1">
                          Deployed in:{" "}
                          {dpg.countries_deployed.join(", ")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold text-[var(--black)] mb-3">
                Coverage by Region
              </h3>
              <RegionBreakdown data={countryData} total={stats.total} />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function StatBox({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-[var(--dark-grey)]">{label}</div>
    </div>
  );
}

function CountryRow({ data }: { data: CountryServiceData }) {
  return (
    <div className="p-4 border-b border-[var(--border-grey)] last:border-b-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-[var(--dark-grey)]">
            {data.country_code}
          </span>
          <h4 className="font-bold text-sm">{data.country_name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-bold px-2 py-0.5 capitalize ${statusColors[data.status]}`}
          >
            {data.status}
          </span>
          <span className="text-[10px] text-[var(--dark-grey)] capitalize">
            {data.confidence} conf.
          </span>
        </div>
      </div>
      {data.summary && (
        <p className="text-xs text-[var(--dark-grey)] mt-2">{data.summary}</p>
      )}
      {data.sources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {data.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              className="text-[10px] text-[var(--link-green)] underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              [{s.type}] {s.title}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function RegionBreakdown({
  data,
}: {
  data: CountryServiceData[];
  total: number;
}) {
  const available = data.filter((d) => d.status === "available").length;
  return (
    <div className="bg-[var(--light-grey)] p-4 text-sm">
      <p className="text-[var(--dark-grey)]">
        <span className="font-bold text-[var(--status-available)]">{available}</span>{" "}
        countries with available digital service
      </p>
      <p className="text-[var(--dark-grey)] mt-1">
        <span className="font-bold text-[var(--status-partial)]">
          {data.filter((d) => d.status === "partial").length}
        </span>{" "}
        with partial availability
      </p>
      <p className="text-xs text-[var(--mid-grey)] mt-3">
        Regional breakdown available when more data is collected.
      </p>
    </div>
  );
}
