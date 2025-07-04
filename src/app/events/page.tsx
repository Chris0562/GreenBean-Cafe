export default function EventsSection() {
  const events = [
    {
      title: "Acoustic Sundays",
      date: "Every Sunday · 10:00-13:00",
      description:
        "Enjoy live acoustic guitar with your morning espresso and croissant.",
      requiresReservation: false,
    },
    {
      title: "Latte Art Workshop",
      date: "July 20 · 15:00-17:00",
      description:
        "Learn the basics of latte art from our baristas. Limited spots!",
      requiresReservation: true,
    },
    {
      title: "Tasting Tuesdays",
      date: "Every Tuesday · 16:00-18:00",
      description:
        "Sample three rotating blends and discover new flavor profiles.",
      requiresReservation: true,
    },
  ];

  return (
    <section className="bg-light-cream text-deep-teal py-10 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-light tracking-wide mb-4">
          Events at GreenBean Café
        </h2>
        <p className="text-base font-light italic mb-10 opacity-80">
          Come for the coffee, stay for the community.
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
                  Reservation required - call or email to sign up.
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
