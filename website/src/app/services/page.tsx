import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ServiceGrid from "@/components/ServiceGrid";
import FrontierShowcase from "@/components/FrontierShowcase";
import {
  services,
  foundationServices,
  essentialServices,
  frontierServices,
} from "@/lib/services";
import { getServiceStats } from "@/lib/data";

export default function ServicesPage() {
  const stats: Record<string, { available: number; total: number }> = {};
  for (const service of services) {
    const s = getServiceStats(service.id);
    stats[service.id] = { available: s.available, total: s.total };
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[var(--green)] text-white py-12 lg:py-16">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wider mb-3 opacity-80">
            Services
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-[48px] font-bold leading-tight mb-4">
            The Digital Services Landscape
          </h1>
          <p className="text-lg leading-relaxed max-w-2xl opacity-90">
            A 360° view of the services governments can deliver digitally—from
            identity and civil registration to education, health, and
            beyond. Organised into three tiers by maturity and global coverage.
          </p>
        </div>
      </section>

      {/* Foundation Services */}
      <section className="py-12 border-b border-[var(--border-grey)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <strong className="text-xs font-bold uppercase tracking-wider text-[var(--green)] bg-[var(--green-light)] px-2 py-1">
              Foundation Services
            </strong>
            <h2 className="text-2xl font-bold text-[var(--black)] mt-3">
              The Non-Negotiables
            </h2>
            <p className="text-[var(--dark-grey)] mt-2 max-w-2xl leading-relaxed">
              You cannot participate in modern society without these. This is
              where DPI investment is most mature, but coverage remains deeply
              uneven.
            </p>
          </div>
          <ServiceGrid services={foundationServices} stats={stats} />
        </div>
      </section>

      {/* Essential Services */}
      <section className="py-12 border-b border-[var(--border-grey)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <strong className="text-xs font-bold uppercase tracking-wider text-[#6f3500] bg-[#fde8d6] px-2 py-1">
              Essential Services
            </strong>
            <h2 className="text-2xl font-bold text-[var(--black)] mt-3">
              The Equity Multipliers
            </h2>
            <p className="text-[var(--dark-grey)] mt-2 max-w-2xl leading-relaxed">
              Most governments provide these in analogue form. Digitising them
              transforms access, reduces corruption, and enables data-driven
              policy.
            </p>
          </div>
          <ServiceGrid services={essentialServices} stats={stats} />
        </div>
      </section>

      {/* Frontier Services */}
      <section className="py-12 border-b border-[var(--border-grey)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <strong className="text-xs font-bold uppercase tracking-wider text-[#4c2c92] bg-[#ebe0f7] px-2 py-1">
              Frontier Services
            </strong>
            <h2 className="text-2xl font-bold text-[var(--black)] mt-3">
              The New Possible
            </h2>
            <p className="text-[var(--dark-grey)] mt-2 max-w-2xl leading-relaxed">
              These services would have been unimaginable at scale five years
              ago. Each is included because at least one country is already doing
              it.
            </p>
          </div>
          <FrontierShowcase services={frontierServices} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[var(--light-grey)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-[var(--black)] mb-3">Get Involved</h2>
          <p className="text-[var(--dark-grey)] mb-6 max-w-2xl leading-relaxed">
            The UDS Tracker is an open-source public good. Whether you are a DPG
            maintainer, a government official, a researcher, or a funder, there
            is a way to contribute data, improve coverage, and close the gap.
          </p>
          <Link
            href="/about"
            className="bg-[var(--green)] hover:bg-[var(--green-hover)] text-white px-5 py-3 font-bold text-sm no-underline inline-block shadow-[inset_0_-3px_0_var(--green-hover)]"
          >
            How to Contribute
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
