export default function ContactInfo() {
  return (
    <section className="bg-light-cream text-deep-teal py-10 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h2 className="text-3xl font-light tracking-wide">Contact Us</h2>
        <p className="italic text-base opacity-80">
          We&apos;re always happy to hear from you.
        </p>

        <div className="space-y-4 text-lg">
          <p>
            <strong>Phone:</strong>{" "}
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
            <strong>Address:</strong> 123 Main Street, New York
          </p>
          <p>
            <strong>Hours:</strong> Mon-Sat: 7:00-19:00 | Sun: 8:00-14:00
          </p>
        </div>
      </div>
    </section>
  );
}
