import { supabase } from "../../../lib/supabaseclient";
import { getLocale, getTranslations } from "next-intl/server";

type EventFromDB = {
  id: number;
  titleEN: string;
  titleIT: string;
  dateEN: string;
  dateIT: string;
  descEN: string;
  descIT: string;
  requiresReservation: boolean;
};

export default async function EventsPage() {
  const locale = await getLocale();
  const t = await getTranslations("Events");

  console.log("Fetching events from Supabase (server-side)...");

  const { data: events, error } = await supabase
    .from<"events", EventFromDB>("events")
    .select("*");

  if (error) {
    console.error("Supabase error:", error);
    return <p>Error loading events.</p>;
  }

  console.log("Events fetched:", events);

  if (!events) {
    return <p>No events found.</p>;
  }

  const localizedEvents = events.map((ev) => ({
    title: locale === "it" ? ev.titleIT : ev.titleEN,
    date: locale === "it" ? ev.dateIT : ev.dateEN,
    description: locale === "it" ? ev.descIT : ev.descEN,
    requiresReservation: ev.requiresReservation,
  }));

  return (
    <section className="bg-light-cream text-deep-teal py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light tracking-wide mb-4">{t("title")}</h2>
        <p className="text-base font-light italic mb-10 opacity-80">
          {t("paragraph")}
        </p>

        <ul className="space-y-8">
          {localizedEvents.map((event, i) => (
            <li
              key={i}
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
