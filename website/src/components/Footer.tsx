export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <h3 className="text-white font-semibold mb-2">
              Universal Digital Services Tracker
            </h3>
            <p className="text-sm max-w-md">
              A public good tracking which of 15 essential digital public
              services are available in every UN member state.
            </p>
          </div>
          <div className="text-sm">
            <p>
              Data licensed under{" "}
              <span className="text-[var(--teal-light)]">CC BY 4.0</span>
            </p>
            <p className="mt-1">
              Code licensed under{" "}
              <span className="text-[var(--teal-light)]">MIT</span>
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-sm text-center">
          Built as a digital public good. Contributions welcome.
        </div>
      </div>
    </footer>
  );
}
