import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="bg-[var(--black)]">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2.5">
            <Link href="/" className="flex items-center gap-3 text-white no-underline hover:no-underline">
              <div className="w-8 h-8 bg-[var(--green)] flex items-center justify-center font-bold text-xs text-white">
                UDS
              </div>
              <span className="font-bold text-lg hidden sm:block">
                UDS Tracker
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-bold">
              <Link
                href="/"
                className="text-white no-underline hover:underline"
              >
                Home
              </Link>
              <Link
                href="/tracker"
                className="text-white no-underline hover:underline"
              >
                Tracker
              </Link>
              <Link
                href="/about"
                className="text-white no-underline hover:underline"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      </div>
      <div className="h-[10px] bg-[var(--green)]" />
    </header>
  );
}
