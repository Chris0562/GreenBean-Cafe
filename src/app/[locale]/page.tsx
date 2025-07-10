import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="text-deep-teal bg-light-cream">
      {/* Hero Section */}
      <section className="relative h-[250px] sm:h-[350px] lg:h-[400px] w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="GreenBean Café"
          fill
          className="brightness-90 object-cover"
          priority
          fetchPriority="high"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,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"
        />
        <div className="absolute inset-0 bg-deep-teal/50 flex items-center justify-center">
          <div className="text-center text-light-cream px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              GreenBean Café
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light">
              {t("HeroParagraph")}
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
          {t("About.title")}
        </h2>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
          {t("About.paragraph")}
        </p>
      </section>

      {/* Showcase */}
      <section className="bg-deep-teal text-light-cream py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
              {t("Showcase.title")}
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              {t("Showcase.paragraph")}
            </p>
          </div>
          <div className="relative h-48 sm:h-56 lg:h-64 w-full rounded overflow-hidden shadow-lg order-1 lg:order-2">
            <Image
              src="/images/coffee_art.jpg"
              alt="Coffee Art"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Menu Preview */}
      <section className="max-w-5xl mx-auto py-3 sm:py-16 lg:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 text-center">
          {t("MenuPreview.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <div>
            <div className="relative aspect-[3/2] w-full rounded shadow overflow-hidden">
              <Image
                src="/images/pastry.jpg"
                alt="Italian pastry"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                quality={60}
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-center font-light">
              {t("MenuPreview.pastries")}
            </p>
          </div>
          <div>
            <div className="relative aspect-[3/2] w-full rounded shadow overflow-hidden">
              <Image
                src="/images/espresso.jpg"
                alt="Espresso"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-center font-light">
              {t("MenuPreview.coffee")}
            </p>
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <Link
            href="/menu"
            className="inline-block bg-deep-teal text-light-cream px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-deep-teal/90 transition text-sm sm:text-base"
          >
            {t("BtnMenu")}
          </Link>
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-light-cream text-deep-teal py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10">
            {t("VisitUs")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Address Block */}
            <div className="bg-deep-teal text-light-cream rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {t("AddressTitle")}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                GreenBean Café
                <br />
                123 Main Street
                <br />
                New York
              </p>
            </div>

            {/* Hours Block */}
            <div className="bg-deep-teal text-light-cream rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                {t("Hours.title")}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                {t("Hours.monFri")}
                <br />
                {t("Hours.sat")}
                <br />
                {t("Hours.sun")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
