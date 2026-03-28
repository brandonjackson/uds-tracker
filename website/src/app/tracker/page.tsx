import { getTrackerMatrix } from "@/lib/data";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrackerMatrix from "./TrackerMatrix";

export default function TrackerPage() {
  const { countries, matrix } = getTrackerMatrix();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[var(--navy)] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-2">Service Tracker</h1>
          <p className="text-slate-300">
            193 countries. 15 services. Tracking digital access for every
            citizen.
          </p>
        </div>
      </section>

      <TrackerMatrix countries={countries} matrix={matrix} />

      <Footer />
    </div>
  );
}
