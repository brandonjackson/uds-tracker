import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="bg-[var(--light-grey)] border-b border-[var(--border-grey)] py-8">
        <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-[var(--black)] mb-2">About the Tracker</h1>
          <p className="text-[var(--dark-grey)] leading-relaxed">
            Methodology, data model, and how to contribute.
          </p>
        </div>
      </section>

      <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1">
        <div className="max-w-none">
          <h2 className="text-2xl font-bold text-[var(--black)]">
            What is the UDS Tracker?
          </h2>
          <p className="text-[var(--dark-grey)] mt-4 leading-relaxed">
            The Universal Digital Services Tracker is a public good: a website,
            a dataset, and a research infrastructure that tracks which of 15
            Foundation and Essential digital services are available in every UN
            member state. It surfaces the open-source tools that can deliver
            them, and champions the countries and innovations that are leading
            the way.
          </p>
          <p className="text-[var(--dark-grey)] mt-4 leading-relaxed">
            The UDS Tracker is not a DPG registry (that&apos;s DPGA&apos;s job). It is not
            an interoperability map (that&apos;s UCL&apos;s DPI Map). It answers a
            different question:{" "}
            <strong>
              for each essential service, in each country, does every citizen
              have digital access — and if not, what would it take to get there?
            </strong>
          </p>

          <hr className="my-8 border-[var(--border-grey)]" />

          <h2 className="text-2xl font-bold text-[var(--black)]">Methodology</h2>

          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            Service Taxonomy
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            We track 15 services across two tiers:
          </p>
          <ul className="text-[var(--dark-grey)] mt-2 space-y-1 list-disc pl-5">
            <li>
              <strong>Foundation Services (1-5):</strong> Digital Identity, Civil
              Registration, Digital Payments, Health Records, Tax
              Administration. The non-negotiables — you cannot participate in
              modern society without these.
            </li>
            <li>
              <strong>Essential Services (6-15):</strong> Social Protection,
              Vehicle &amp; Driver&apos;s Licensing, Land &amp; Property, Education,
              Business Registration, Electoral Services, Justice &amp; Legal
              Aid, Agricultural Extension, Immigration &amp; Travel, Policing
              &amp; Public Safety. The equity multipliers that transform access
              when digitised.
            </li>
          </ul>

          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            Status Values
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            Each country-service combination receives one of four status values:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 mt-4 border border-[var(--border-grey)]">
            <div className="border-b sm:border-r border-[var(--border-grey)] p-4 border-l-4 border-l-[var(--status-available)]">
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-[var(--black)]">Available</strong>
              </div>
              <p className="text-sm text-[var(--dark-grey)]">
                The service is digitally accessible to citizens end-to-end. A
                PDF form on a website alone does not qualify.
              </p>
            </div>
            <div className="border-b border-[var(--border-grey)] p-4 border-l-4 border-l-[var(--status-partial)]">
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-[var(--black)]">Partial</strong>
              </div>
              <p className="text-sm text-[var(--dark-grey)]">
                Some aspects of the service are available digitally but
                significant gaps remain (e.g., only in urban areas or only for
                some functions).
              </p>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-[var(--border-grey)] p-4 border-l-4 border-l-[var(--status-unavailable)]">
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-[var(--black)]">Unavailable</strong>
              </div>
              <p className="text-sm text-[var(--dark-grey)]">
                The service does not exist in digital form for citizens. It may
                exist in analogue form only.
              </p>
            </div>
            <div className="p-4 border-l-4 border-l-[var(--mid-grey)]">
              <div className="flex items-center gap-2 mb-1">
                <strong className="text-[var(--black)]">Unknown</strong>
              </div>
              <p className="text-sm text-[var(--dark-grey)]">
                No data has been collected or verified for this country-service
                combination.
              </p>
            </div>
          </div>

          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            Confidence Model
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            Every data point carries a confidence level reflecting its
            reliability:
          </p>
          <ul className="text-[var(--dark-grey)] mt-2 space-y-2 list-disc pl-5">
            <li>
              <strong>Low:</strong> Initial desk research or AI-generated. No
              primary source verified. This is the starting point for all new
              data.
            </li>
            <li>
              <strong>Medium:</strong> At least one primary source (government
              website, donor report, DPG deployment record) confirmed by a human
              reviewer.
            </li>
            <li>
              <strong>High:</strong> Multiple corroborating sources, data
              verified within the last 12 months.
            </li>
          </ul>

          <hr className="my-8 border-[var(--border-grey)]" />

          <h2 className="text-2xl font-bold text-[var(--black)]">
            How to Contribute
          </h2>
          <p className="text-[var(--dark-grey)] mt-4 leading-relaxed">
            The UDS Tracker is an open-source project and welcomes contributions
            from DPG maintainers, government officials, researchers, and anyone
            with knowledge of digital public services.
          </p>
          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            For DPG Maintainers
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            If your digital public good is deployed in a country, submit a pull
            request to add or update the relevant country data file. Include the
            deployment details and at least one verifiable source.
          </p>
          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            For Government Officials
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            If you know the status of a digital service in your country, we
            welcome corrections and additions. Each data submission should
            include a link to the service or an official source confirming its
            existence.
          </p>
          <h3 className="text-lg font-bold text-[var(--black)] mt-6">
            For Researchers
          </h3>
          <p className="text-[var(--dark-grey)] mt-2 leading-relaxed">
            Help us upgrade data from Low to Medium or High confidence by
            verifying existing entries against primary sources. The research
            agent prompts in the repository can guide systematic verification.
          </p>

          <hr className="my-8 border-[var(--border-grey)]" />

          <h2 className="text-2xl font-bold text-[var(--black)]">
            What This Is Not
          </h2>
          <ul className="text-[var(--dark-grey)] mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>Not a DPG registry.</strong> That&apos;s DPGA&apos;s territory. We
              reference their registry, not replicate it.
            </li>
            <li>
              <strong>Not an interoperability map.</strong> That&apos;s UCL&apos;s DPI Map.
              We complement their work.
            </li>
            <li>
              <strong>Not a government maturity model.</strong> That&apos;s the GovTech
              Maturity Index. We track citizen access, not institutional
              readiness.
            </li>
            <li>
              <strong>Not a ranking or name-and-shame tool.</strong> The goal is
              coordination and visibility, not competition.
            </li>
          </ul>

          <hr className="my-8 border-[var(--border-grey)]" />

          <h2 className="text-2xl font-bold text-[var(--black)]">Inspiration</h2>
          <ul className="text-[var(--dark-grey)] mt-4 space-y-2 list-disc pl-5">
            <li>
              <strong>SDG Index (Bertelsmann / SDSN)</strong> — Country-level
              scorecards that drive policy attention
            </li>
            <li>
              <strong>Mo Ibrahim Index of African Governance</strong> —
              Data-driven accountability for government performance
            </li>
            <li>
              <strong>UCL DPI Map</strong> — The closest existing work, scoped
              to infrastructure not services
            </li>
            <li>
              <strong>DPGA Registry</strong> — The canonical list of digital
              public goods
            </li>
            <li>
              <strong>Our World in Data</strong> — The gold standard for making
              complex global data accessible
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
}
