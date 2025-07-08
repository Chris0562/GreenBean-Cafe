import Image from "next/image";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function CafeFooter() {
  const t = useTranslations("CafeFooter");

  return (
    <footer className="py-8 md:py-10 px-4 md:px-6 bg-deep-teal">
      <div className="max-w-4xl mx-auto text-center text-light-cream">
        <p className="text-base md:text-lg font-light italic tracking-wide opacity-90 mb-4 md:mb-6">
          {t("title")}
        </p>

        {/* Social Media */}
        <div className="flex flex-col items-center gap-4 md:gap-6 lg:flex-row lg:justify-center lg:gap-10 text-sm font-light opacity-80">
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="https://facebook.com"
              aria-label="Facebook"
              className="hover:opacity-100 opacity-80 transition-transform transform hover:-translate-y-1"
            >
              <Image
                src="/images/socials/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
            </Link>

            <Link
              href="https://instagram.com"
              aria-label="Instagram"
              className="hover:opacity-100 opacity-80 transition-transform transform hover:-translate-y-1"
            >
              <Image
                src="/images/socials/instagram.png"
                alt="Instagram"
                width={24}
                height={24}
              />
            </Link>

            <Link
              href="https://x.com"
              aria-label="Twitter"
              className="hover:opacity-100 opacity-80 transition-transform transform hover:-translate-y-1"
            >
              <Image
                src="/images/socials/x.png"
                alt="Twitter"
                width={24}
                height={24}
              />
            </Link>
          </div>

          {/* Address */}
          <div className="text-center lg:text-left">
            123 Main Street, New York
          </div>
        </div>
      </div>
    </footer>
  );
}
