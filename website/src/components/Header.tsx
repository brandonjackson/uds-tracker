import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[var(--navy)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--teal)] rounded-sm flex items-center justify-center font-bold text-sm">
              UDS
            </div>
            <span className="font-semibold text-lg hidden sm:block">
              Universal Digital Services Tracker
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Home
            </Link>
            <Link
              href="/tracker"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Tracker
            </Link>
            <Link
              href="/about"
              className="text-slate-300 hover:text-white transition-colors"
            >
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
