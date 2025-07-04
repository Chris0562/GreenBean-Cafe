import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="text-deep-teal bg-light-cream">
      {/* Hero Section */}
      <section className="relative h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="GreenBean Café"
          fill
          style={{ objectFit: "cover" }}
          className="brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-deep-teal/50 flex items-center justify-center">
          <div className="text-center text-light-cream px-4 sm:px-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-4 leading-tight">
              GreenBean Café
            </h1>
            <p className="text-base sm:text-lg md:text-xl font-light">
              A warm welcome. A better brew.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-4xl mx-auto py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
          A Moment of Respite
        </h2>
        <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
          Nestled in the heart of the city, GreenBean Café brings the aroma of
          authentic Italian coffee and pastries to a cozy, quiet space. Whether
          you&apos;re starting your day or catching up with friends, we offer an
          experience to savor.
        </p>
      </section>

      {/* Showcase */}
      <section className="bg-deep-teal text-light-cream py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 sm:mb-6">
              Crafted with Care
            </h2>
            <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
              Our beans are slow-roasted to bring out the deepest flavors. Each
              cup is poured with passion, and our selection of pastries is
              hand-picked from traditional Italian recipes.
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
          On the Menu
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          <div>
            <div className="relative aspect-[3/2] w-full rounded shadow overflow-hidden">
              <Image
                src="/images/pastry.jpg"
                alt="Italian pastry"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                style={{ objectFit: "cover" }}
              />
            </div>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-center font-light">
              Freshly baked pastries, daily
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
              Espresso, cappuccino & more
            </p>
          </div>
        </div>
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <Link
            href="/menu"
            className="inline-block bg-deep-teal text-light-cream px-4 sm:px-6 py-2 sm:py-3 rounded hover:bg-deep-teal/90 transition text-sm sm:text-base"
          >
            View Full Menu
          </Link>
        </div>
      </section>

      {/* Visit Us */}
      <section className="bg-light-cream text-deep-teal py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 sm:mb-8 lg:mb-10">
            Visit Us
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Address Block */}
            <div className="bg-deep-teal text-light-cream rounded-xl sm:rounded-2xl px-4 sm:px-6 py-6 sm:py-8 shadow">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
                Our Location
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
                Opening Hours
              </h3>
              <p className="text-base sm:text-lg leading-relaxed">
                Monday - Friday: 8:00 - 19:00
                <br />
                Saturday: 9:00 - 18:00
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
