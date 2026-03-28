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

export default function Home() {
  const stats: Record<string, { available: number; total: number }> = {};
  for (const service of services) {
    const s = getServiceStats(service.id);
    stats[service.id] = { available: s.available, total: s.total };
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-[var(--navy)] text-white py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--teal-light)] text-sm font-medium uppercase tracking-wider mb-4">
            A Digital Public Good
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
            By 2035, every person on earth should have access to{" "}
            <span className="text-[var(--teal-light)]">
              15 essential digital public services
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            The Universal Digital Services Tracker maps which services exist in
            every UN member state, surfaces the open-source tools that can
            deliver them, and champions the countries leading the way.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/tracker"
              className="bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explore the Tracker
            </Link>
            <Link
              href="/about"
              className="border border-slate-500 hover:border-slate-300 text-slate-300 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Foundation Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-wider text-[var(--teal-dark)] bg-teal-50 px-2 py-1 rounded">
              Foundation Services
            </span>
            <h2 className="text-2xl font-bold text-[var(--navy)] mt-3">
              The Non-Negotiables
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              You cannot participate in modern society without these. This is
              where DPI investment is most mature, but coverage remains deeply
              uneven.
            </p>
          </div>
          <ServiceGrid services={foundationServices} stats={stats} />
        </div>
      </section>

      {/* Essential Services */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-1 rounded">
              Essential Services
            </span>
            <h2 className="text-2xl font-bold text-[var(--navy)] mt-3">
              The Equity Multipliers
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Most governments provide these in analogue form. Digitising them
              transforms access, reduces corruption, and enables data-driven
              policy.
            </p>
          </div>
          <ServiceGrid services={essentialServices} stats={stats} />
        </div>
      </section>

      {/* Frontier Services */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs font-medium uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-1 rounded">
              Frontier Services
            </span>
            <h2 className="text-2xl font-bold text-[var(--navy)] mt-3">
              The New Possible
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              These services would have been unimaginable at scale five years
              ago. Each is included because at least one country is already doing
              it.
            </p>
          </div>
          <FrontierShowcase services={frontierServices} />
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--navy)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Get Involved</h2>
          <p className="text-slate-300 mb-8">
            The UDS Tracker is an open-source public good. Whether you are a DPG
            maintainer, a government official, a researcher, or a funder, there
            is a way to contribute data, improve coverage, and close the gap.
          </p>
          <Link
            href="/about"
            className="bg-[var(--teal)] hover:bg-[var(--teal-dark)] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            How to Contribute
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
