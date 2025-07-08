import fs from "fs/promises";
import path from "path";
import { getLocale, getTranslations } from "next-intl/server";

type Event = {
  title: string;
  date: string;
  description: string;
  requiresReservation: boolean;
};

async function getEvents(locale: string): Promise<Event[]> {
  const filePath = path.join(
    process.cwd(),
    "public/locales",
    locale,
    "events.json"
  );
  const file = await fs.readFile(filePath, "utf-8");
  return JSON.parse(file);
}

export default async function EventsSection() {
  const locale = await getLocale();
  const t = await getTranslations("Events");
  const events = await getEvents(locale);

  return (
    <section className="bg-light-cream text-deep-teal py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light tracking-wide mb-4">{t("title")}</h2>
        <p className="text-base font-light italic mb-10 opacity-80">
          {t("paragraph")}
        </p>

        <ul className="space-y-8">
          {events.map((event, index) => (
            <li
              key={index}
              className="bg-deep-teal text-light-cream px-6 py-6 rounded-2xl shadow-md"
            >
              <h3 className="text-xl font-medium mb-1">{event.title}</h3>
              <p className="text-sm font-light mb-2 opacity-90">{event.date}</p>
              <p className="text-sm font-light text-light-cream/80 mb-2">
                {event.description}
              </p>
              {event.requiresReservation && (
                <p className="text-xs font-light italic text-light-cream/60">
                  {t("reservation")}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
