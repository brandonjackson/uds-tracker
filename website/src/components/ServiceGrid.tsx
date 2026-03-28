import Link from "next/link";
import { ServiceDefinition } from "@/lib/types";

const dpgMaturityColor = {
  Mature: "bg-[var(--green-light)] text-[var(--green)]",
  Emerging: "bg-[#fde8d6] text-[#6f3500]",
  Gap: "bg-[#f6d7d2] text-[var(--status-unavailable)]",
};

export default function ServiceGrid({
  services,
  stats,
}: {
  services: ServiceDefinition[];
  stats: Record<string, { available: number; total: number }>;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--border-grey)]">
      {services.map((service) => {
        const s = stats[service.id] || { available: 0, total: 193 };
        return (
          <Link
            key={service.id}
            href={`/service/${service.id}`}
            className="group bg-white p-4 no-underline hover:bg-[var(--light-grey)] transition-colors border-l-4 border-l-transparent hover:border-l-[var(--green)]"
          >
            <div className="flex items-start justify-between mb-2">
              <span className="text-xs font-mono text-[var(--dark-grey)]">
                {String(service.number).padStart(2, "0")}
              </span>
              <span
                className={`text-[10px] font-bold px-1.5 py-0.5 ${dpgMaturityColor[service.dpg_maturity]}`}
              >
                {service.dpg_maturity}
              </span>
            </div>
            <h3 className="font-bold text-sm text-[var(--black)] mb-1 group-hover:text-[var(--green)]">
              {service.name}
            </h3>
            <p className="text-xs text-[var(--dark-grey)] leading-relaxed mb-3">
              {service.description}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="flex-1 h-1.5 bg-[var(--light-grey)] overflow-hidden">
                <div
                  className="h-full bg-[var(--green)]"
                  style={{
                    width: `${(s.available / Math.max(s.total, 1)) * 100}%`,
                  }}
                />
              </div>
              <span className="text-[10px] font-mono text-[var(--dark-grey)]">
                {s.available}/{s.total}
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
