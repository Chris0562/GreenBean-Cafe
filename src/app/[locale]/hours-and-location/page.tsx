import { useTranslations } from "next-intl";

import Map from "@/components/Map";

export default function ContactInfo() {
  const t = useTranslations("HoursAndLocation");

  return (
    <section className="bg-light-cream text-deep-teal py-10 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-light tracking-wide">{t("title")}</h2>
        <p className="italic text-base opacity-80">{t("paragraph")}</p>

        <div className="space-y-4 text-lg">
          <p>
            <strong>{t("Strong.phone")}</strong>{" "}
            <a
              href="tel:+391234567890"
              className="hover:underline hover:text-opacity-80"
            >
              +39 123 456 7890
            </a>
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <a
              href="mailto:info@greenbean.cafe"
              className="hover:underline hover:text-opacity-80"
            >
              info@greenbean.cafe
            </a>
          </p>
          <p>
            <strong>{t("Strong.hours")}</strong>
            {t("hours")}
          </p>
          <p>
            <strong>{t("Strong.address")}</strong> 123 Main Street, New York
          </p>
        </div>
      </div>
      <Map />
    </section>
  );
}
