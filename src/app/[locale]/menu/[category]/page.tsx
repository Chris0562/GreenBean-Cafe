import { supabase } from "../../../../lib/supabaseclient";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";

const VALID_CATEGORIES = ["coffee", "pastries"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

export async function generateStaticParams() {
  const locales = ["en", "it"];
  return locales.flatMap((locale) =>
    VALID_CATEGORIES.map((category) => ({ locale, category }))
  );
}

type MenuItemFromDB = {
  id: number;
  category: "coffee" | "pastries";
  name: string;
  price: number;
  descEN: string;
  descIT: string;
};

type Props = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

export default async function MenuCategoryPage({ params }: Props) {
  const { locale, category } = await params;

  if (!VALID_CATEGORIES.includes(category as Category)) {
    return notFound();
  }

  setRequestLocale(locale);

  const { data, error } = await supabase
    .from("menu")
    .select("id, category, name, price, descEN, descIT")
    .eq("category", category as Category);

  const items = data as MenuItemFromDB[] | null;

  if (error) {
    console.error("Supabase menu fetch error:", error);
    return <p>Error loading menu.</p>;
  }

  if (!items || items.length === 0) {
    return notFound();
  }

  const localizedItems = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    description: locale === "it" ? item.descIT : item.descEN,
  }));

  const categoryTitles = {
    coffee: locale === "it" ? "Caffetteria" : "Coffee",
    pastries: locale === "it" ? "Pasticceria" : "Pastries",
  };
  const title = categoryTitles[category as Category];

  return (
    <div className="min-h-screen px-4 py-10 bg-light-cream text-deep-teal">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-wide capitalize">
          {title}
        </h1>

        {/* Category Switcher */}
        <div className="flex justify-center gap-4 mb-12">
          {VALID_CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/menu/${cat}`}
              className={`px-6 py-3 rounded-full font-medium border-2 border-deep-teal transition-colors duration-300
                ${
                  category === cat
                    ? "bg-deep-teal text-light-cream shadow"
                    : "text-deep-teal hover:bg-deep-teal/10"
                }
              `}
            >
              {categoryTitles[cat]}
            </Link>
          ))}
        </div>

        {/* Menu List */}
        <div className="max-w-2xl mx-auto bg-deep-teal text-light-cream rounded-2xl shadow-2xl px-8 py-12">
          <ul className="space-y-8">
            {localizedItems.map((item, index) => (
              <li
                key={item.id}
                className={`pb-6 ${
                  index !== localizedItems.length - 1
                    ? "border-b border-light-cream/20"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h2 className="text-lg font-medium flex-1">{item.name}</h2>
                  <span className="text-base font-light whitespace-nowrap">
                    ${item.price.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm font-light text-light-cream/80 leading-relaxed">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
