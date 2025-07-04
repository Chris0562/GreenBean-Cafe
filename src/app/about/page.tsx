import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-10 px-4 lg:py-24 bg-light-cream text-deep-teal">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <div className="space-y-8 lg:pr-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight tracking-wide">
                A Quiet Corner in the City
              </h2>

              <div className="w-16 h-0.5 bg-gray-400"></div>
            </div>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-light max-w-2xl">
              Step away from the rush and into our warm embrace. Here, time
              moves a little slower, conversations flow a little deeper, and
              every cup tells a story.
            </p>

            <p className="text-lg text-gray-600 leading-relaxed font-light">
              Whether you&apos;re seeking solitude with a good book or
              connection with old friends, our space invites you to pause,
              breathe, and savor the simple pleasure of a perfectly crafted
              moment.
            </p>

            <div className="pt-4">
              <div className="inline-flex items-center text-sm text-gray-500 font-medium tracking-wider uppercase">
                <span className="w-8 h-px bg-gray-400 mr-3"></span>
                Since 2024
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              style={{ backgroundColor: "#0d4f4f" }}
            >
              <div className="p-6 lg:p-8">
                <div className="aspect-[4/5] relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                  <Image
                    src="/images/outside.jpg"
                    alt="Cozy café interior with warm lighting"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Background decorative element */}
            <div
              className="absolute -z-10 -top-8 -left-8 w-32 h-32 rounded-full opacity-10"
              style={{ backgroundColor: "#0d4f4f" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
