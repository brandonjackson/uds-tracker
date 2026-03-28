import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { services } from "@/lib/services";
import { getAllCountryDataForService, getDPGsForService, getServiceStats } from "@/lib/data";
import type { CountryServiceData, ServiceStatus, ConfidenceLevel } from "@/lib/types";
import Link from "next/link";

const statusColors: Record<ServiceStatus, string> = {
  available: "bg-emerald-500 text-white",
  partial: "bg-amber-400 text-amber-900",
  unavailable: "bg-red-400 text-white",
  unknown: "bg-slate-200 text-slate-500",
};

const tierColors = {
  Foundation: "bg-teal-50 text-teal-800",
  Essential: "bg-amber-50 text-amber-800",
};

const dpgMaturityColors = {
  Mature: "bg-emerald-100 text-emerald-800",
  Emerging: "bg-amber-100 text-amber-800",
  Gap: "bg-red-100 text-red-800",
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

      <section className="bg-[var(--navy)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Link
              href="/"
              className="text-slate-400 hover:text-white text-sm"
            >
              Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 text-sm">Services</span>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-3xl font-mono text-[var(--teal-light)] opacity-50">
              {String(service.number).padStart(2, "0")}
            </span>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${tierColors[service.tier]}`}
                >
                  {service.tier}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-0.5 rounded ${dpgMaturityColors[service.dpg_maturity]}`}
                >
                  DPG: {service.dpg_maturity}
                </span>
              </div>
              <h1 className="text-3xl font-bold">{service.name}</h1>
              <p className="text-slate-300 mt-2 max-w-2xl">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatBox
              label="Available"
              value={stats.available}
              color="text-emerald-600"
            />
            <StatBox
              label="Partial"
              value={stats.partial}
              color="text-amber-600"
            />
            <StatBox
              label="Unavailable"
              value={stats.unavailable}
              color="text-red-600"
            />
            <StatBox
              label="Unknown"
              value={stats.unknown}
              color="text-slate-400"
            />
            <StatBox
              label="Total Countries"
              value={stats.total}
              color="text-slate-700"
            />
          </div>
          <div className="mt-4 h-3 bg-slate-100 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full"
              style={{
                width: `${(stats.available / stats.total) * 100}%`,
              }}
            />
            <div
              className="bg-amber-400 h-full"
              style={{
                width: `${(stats.partial / stats.total) * 100}%`,
              }}
            />
            <div
              className="bg-red-400 h-full"
              style={{
                width: `${(stats.unavailable / stats.total) * 100}%`,
              }}
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[var(--navy)] mb-4">
              Country Data
            </h2>

            {countryData.length === 0 ? (
              <div className="bg-slate-50 rounded-lg p-8 text-center">
                <p className="text-slate-500">
                  No country data has been collected for this service yet.
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  All {stats.total} countries are currently marked as
                  &ldquo;unknown.&rdquo;
                </p>
              </div>
            ) : (
              <div className="space-y-3">
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
                <h3 className="text-lg font-bold text-[var(--navy)] mb-3">
                  Digital Public Goods
                </h3>
                <div className="space-y-3">
                  {dpgs.map((dpg) => (
                    <div
                      key={dpg.name}
                      className="bg-white border rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <h4 className="font-semibold text-sm">{dpg.name}</h4>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded ${
                            dpg.maturity === "Mature"
                              ? "bg-emerald-100 text-emerald-700"
                              : dpg.maturity === "Emerging"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {dpg.maturity}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {dpg.description}
                      </p>
                      {dpg.url && (
                        <a
                          href={dpg.url}
                          className="text-xs text-[var(--teal)] hover:underline mt-2 inline-block"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on DPGA Registry
                        </a>
                      )}
                      {dpg.countries_deployed.length > 0 && (
                        <p className="text-[10px] text-slate-400 mt-1">
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
              <h3 className="text-lg font-bold text-[var(--navy)] mb-3">
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
      <div className="text-xs text-slate-500">{label}</div>
    </div>
  );
}

function CountryRow({ data }: { data: CountryServiceData }) {
  return (
    <div className="bg-white border rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-slate-400">
            {data.country_code}
          </span>
          <h4 className="font-semibold text-sm">{data.country_name}</h4>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-[10px] font-medium px-2 py-0.5 rounded capitalize ${statusColors[data.status]}`}
          >
            {data.status}
          </span>
          <span className="text-[10px] text-slate-400 capitalize">
            {data.confidence} conf.
          </span>
        </div>
      </div>
      {data.summary && (
        <p className="text-xs text-slate-600 mt-2">{data.summary}</p>
      )}
      {data.sources.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {data.sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              className="text-[10px] text-[var(--teal)] hover:underline"
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
  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];
  // Since we don't have region data in CountryServiceData, just show totals
  const available = data.filter((d) => d.status === "available").length;
  return (
    <div className="bg-slate-50 rounded-lg p-4 text-sm">
      <p className="text-slate-600">
        <span className="font-semibold text-emerald-600">{available}</span>{" "}
        countries with available digital service
      </p>
      <p className="text-slate-600 mt-1">
        <span className="font-semibold text-amber-600">
          {data.filter((d) => d.status === "partial").length}
        </span>{" "}
        with partial availability
      </p>
      <p className="text-xs text-slate-400 mt-3">
        Regional breakdown available when more data is collected.
      </p>
    </div>
  );
}
