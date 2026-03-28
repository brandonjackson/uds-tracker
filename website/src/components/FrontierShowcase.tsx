import { FrontierService } from "@/lib/types";

export default function FrontierShowcase({
  services,
}: {
  services: FrontierService[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-gradient-to-br from-[var(--navy)] to-[var(--navy-mid)] rounded-lg p-6 text-white"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono text-[var(--teal-light)]">
              {service.number}
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              Frontier
            </span>
          </div>
          <h3 className="font-semibold text-lg mb-2">{service.name}</h3>
          <p className="text-sm text-slate-300 mb-4">{service.description}</p>
          <div className="space-y-2">
            {service.exemplars.map((ex, i) => (
              <div key={i} className="text-xs">
                <span className="text-[var(--teal-light)] font-medium">
                  {ex.country}:
                </span>{" "}
                <span className="text-slate-400">{ex.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
