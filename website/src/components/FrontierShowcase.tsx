import { FrontierService } from "@/lib/types";

export default function FrontierShowcase({
  services,
}: {
  services: FrontierService[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--border-grey)]">
      {services.map((service) => (
        <div
          key={service.id}
          className="bg-white p-5 border-t-4 border-t-[var(--green)]"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono text-[var(--dark-grey)]">
              {service.number}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--dark-grey)]">
              Frontier
            </span>
          </div>
          <h3 className="font-bold text-lg text-[var(--black)] mb-2">{service.name}</h3>
          <p className="text-sm text-[var(--dark-grey)] mb-4 leading-relaxed">{service.description}</p>
          <div className="space-y-2 border-t border-[var(--border-grey)] pt-3">
            {service.exemplars.map((ex, i) => (
              <div key={i} className="text-xs">
                <span className="text-[var(--green)] font-bold">
                  {ex.country}:
                </span>{" "}
                <span className="text-[var(--dark-grey)]">{ex.description}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
