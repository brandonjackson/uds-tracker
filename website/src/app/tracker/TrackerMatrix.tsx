"use client";

import { useState, useMemo } from "react";
import { services } from "@/lib/services";
import type {
  Country,
  CountryServiceData,
  ServiceStatus,
  ConfidenceLevel,
} from "@/lib/types";

const statusColors: Record<ServiceStatus, string> = {
  available: "bg-emerald-500",
  partial: "bg-amber-400",
  unavailable: "bg-red-400",
  unknown: "bg-slate-200",
};

const confidenceBorder: Record<ConfidenceLevel, string> = {
  high: "ring-2 ring-emerald-600",
  medium: "ring-1 ring-slate-400",
  low: "",
};

type Region = "All" | "Africa" | "Americas" | "Asia" | "Europe" | "Oceania";
type Income = "All" | "Low" | "Lower-middle" | "Upper-middle" | "High";

export default function TrackerMatrix({
  countries,
  matrix,
}: {
  countries: Country[];
  matrix: Record<string, Record<string, CountryServiceData | null>>;
}) {
  const [regionFilter, setRegionFilter] = useState<Region>("All");
  const [incomeFilter, setIncomeFilter] = useState<Income>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    return countries.filter((c) => {
      if (regionFilter !== "All" && c.region !== regionFilter) return false;
      if (incomeFilter !== "All" && c.income_level !== incomeFilter)
        return false;
      if (
        searchQuery &&
        !c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  }, [countries, regionFilter, incomeFilter, searchQuery]);

  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    data: CountryServiceData | null;
    country: Country;
    serviceId: string;
  } | null>(null);

  return (
    <>
      <section className="py-6 border-b bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center gap-4">
          <input
            type="text"
            placeholder="Search countries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-3 py-1.5 text-sm w-48"
          />
          <select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value as Region)}
            className="border rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="All">All Regions</option>
            <option value="Africa">Africa</option>
            <option value="Americas">Americas</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
            <option value="Oceania">Oceania</option>
          </select>
          <select
            value={incomeFilter}
            onChange={(e) => setIncomeFilter(e.target.value as Income)}
            className="border rounded-lg px-3 py-1.5 text-sm"
          >
            <option value="All">All Income Levels</option>
            <option value="Low">Low</option>
            <option value="Lower-middle">Lower-middle</option>
            <option value="Upper-middle">Upper-middle</option>
            <option value="High">High</option>
          </select>
          <div className="flex items-center gap-3 ml-auto text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-emerald-500" /> Available
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-amber-400" /> Partial
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-red-400" /> Unavailable
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-slate-200" /> Unknown
            </span>
          </div>
        </div>
      </section>

      <section className="flex-1 overflow-x-auto py-4">
        <div className="max-w-[1600px] mx-auto px-4">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr>
                <th className="sticky left-0 bg-white z-20 text-left py-2 px-2 font-semibold text-slate-700 border-b min-w-[180px]">
                  Country
                </th>
                {services.map((s) => (
                  <th
                    key={s.id}
                    className="py-2 px-1 font-medium text-slate-600 border-b text-center min-w-[60px]"
                  >
                    <a
                      href={`/service/${s.id}`}
                      className="hover:text-[var(--teal-dark)]"
                      title={s.name}
                    >
                      {String(s.number).padStart(2, "0")}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredCountries.map((country) => (
                <tr
                  key={country.code}
                  className="hover:bg-slate-50 border-b border-slate-100"
                >
                  <td className="sticky left-0 bg-white z-10 py-1.5 px-2 font-medium text-slate-700 group-hover:bg-slate-50">
                    {country.name}
                  </td>
                  {services.map((service) => {
                    const data = matrix[country.code]?.[service.id] || null;
                    const status: ServiceStatus = data?.status || "unknown";
                    const confidence: ConfidenceLevel =
                      data?.confidence || "low";
                    return (
                      <td
                        key={service.id}
                        className="py-1.5 px-1 text-center"
                      >
                        <button
                          className={`w-6 h-6 rounded-sm ${statusColors[status]} ${confidenceBorder[confidence]} inline-block cursor-pointer hover:scale-125 transition-transform`}
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setTooltip({
                              x: rect.left + rect.width / 2,
                              y: rect.bottom + 8,
                              data,
                              country,
                              serviceId: service.id,
                            });
                          }}
                          onMouseLeave={() => setTooltip(null)}
                          aria-label={`${country.name} - ${service.name}: ${status}`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {filteredCountries.length === 0 && (
            <p className="text-center text-slate-400 py-12">
              No countries match your filters.
            </p>
          )}
        </div>

        {tooltip && (
          <div
            className="fixed z-50 bg-white shadow-lg rounded-lg border border-slate-200 p-3 max-w-xs pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y,
              transform: "translateX(-50%)",
            }}
          >
            <p className="font-semibold text-sm">{tooltip.country.name}</p>
            <p className="text-xs text-slate-500 mb-1">
              {services.find((s) => s.id === tooltip.serviceId)?.name}
            </p>
            {tooltip.data ? (
              <>
                <p className="text-xs">
                  Status:{" "}
                  <span className="font-medium capitalize">
                    {tooltip.data.status}
                  </span>{" "}
                  (
                  <span className="capitalize">
                    {tooltip.data.confidence}
                  </span>{" "}
                  confidence)
                </p>
                {tooltip.data.summary && (
                  <p className="text-xs text-slate-500 mt-1">
                    {tooltip.data.summary}
                  </p>
                )}
              </>
            ) : (
              <p className="text-xs text-slate-400">No data yet</p>
            )}
          </div>
        )}
      </section>

      <div className="bg-white border-t py-4 text-center text-xs text-slate-400">
        Showing {filteredCountries.length} of {countries.length} countries
      </div>
    </>
  );
}
