import Link from "next/link";
import { ServiceDefinition } from "@/lib/types";

const dpgMaturityColor = {
  Mature: "bg-emerald-100 text-emerald-800",
  Emerging: "bg-amber-100 text-amber-800",
  Gap: "bg-red-100 text-red-800",
};

export default function ServiceGrid({
  services,
  stats,
}: {
  services: ServiceDefinition[];
  stats: Record<string, { available: number; total: number }>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      {services.map((service) => {
        const s = stats[service.id] || { available: 0, total: 193 };
        return (
          <Link
            key={service.id}
            href={`/service/${service.id}`}
            className="group relative bg-white border border-slate-200 rounded-lg p-4 hover:border-[var(--teal)] hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-mono text-slate-400">
                {String(service.number).padStart(2, "0")}
              </span>
              <span
                className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${dpgMaturityColor[service.dpg_maturity]}`}
              >
                {service.dpg_maturity}
              </span>
            </div>
            <h3 className="font-semibold text-sm text-[var(--navy)] mb-1 group-hover:text-[var(--teal-dark)]">
              {service.name}
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">
              {service.description}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[var(--teal)] rounded-full transition-all"
                  style={{
                    width: `${(s.available / Math.max(s.total, 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                {s.available}/{s.total}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
