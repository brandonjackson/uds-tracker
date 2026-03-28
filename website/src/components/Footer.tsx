export default function Footer() {
  return (
    <footer className="bg-[var(--light-grey)] border-t border-[var(--border-grey)] mt-auto">
      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h3 className="text-[var(--black)] font-bold text-base mb-2">
              Universal Digital Services Tracker
            </h3>
            <p className="text-sm text-[var(--dark-grey)] max-w-md leading-relaxed">
              A public good tracking which of 15 essential digital public
              services are available in every UN member state.
            </p>
          </div>
          <div className="text-sm text-[var(--dark-grey)]">
            <p>
              Data licensed under{" "}
              <span className="font-bold text-[var(--link-green)]">CC BY 4.0</span>
            </p>
            <p className="mt-1">
              Code licensed under{" "}
              <span className="font-bold text-[var(--link-green)]">MIT</span>
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--border-grey)] mt-6 pt-6 text-sm text-[var(--dark-grey)]">
          Built as a digital public good. Contributions welcome.
        </div>
      </div>
    </footer>
  );
}
