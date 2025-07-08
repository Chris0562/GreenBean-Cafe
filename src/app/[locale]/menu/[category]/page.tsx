import { getTranslations, getLocale } from "next-intl/server";
import fs from "fs/promises";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
};

type MenuData = {
  coffee: {
    title: string;
    items: MenuItem[];
  };
  pastries: {
    title: string;
    items: MenuItem[];
  };
};

const VALID_CATEGORIES = ["coffee", "pastries"] as const;
type Category = (typeof VALID_CATEGORIES)[number];

export async function generateStaticParams() {
  const locales = ["en", "it"];
  const categories = ["coffee", "pastries"];

  return locales.flatMap((locale) =>
    categories.map((category) => ({
      locale,
      category,
    }))
  );
}

async function getMenuData(locale: string): Promise<MenuData> {
  const filePath = path.join(
    process.cwd(),
    "public/locales",
    locale,
    "menu.json"
  );
  const fileData = await fs.readFile(filePath, "utf-8");
  return JSON.parse(fileData);
}

export default async function MenuCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = await params;

  const t = await getTranslations("Menu");
  const locale = await getLocale();

  if (!VALID_CATEGORIES.includes(category as Category)) {
    return notFound();
  }

  const menu = await getMenuData(locale);
  const categoryData = menu[category as Category];

  if (!categoryData || !categoryData.items?.length) {
    return notFound();
  }

  const { title, items } = categoryData;

  return (
    <div className="min-h-screen px-4 py-10 bg-light-cream text-deep-teal">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-light text-center mb-12 tracking-wide capitalize">
          {title}
        </h1>

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
              {menu[cat].title}
            </Link>
          ))}
        </div>

        {/* Menu Items */}
        <div className="max-w-2xl mx-auto bg-deep-teal text-light-cream rounded-2xl shadow-2xl px-8 py-12">
          <ul className="space-y-8">
            {items.map((item, index) => (
              <li
                key={item.id}
                className={`pb-6 ${
                  index !== items.length - 1
                    ? "border-b border-light-cream/20"
                    : ""
                }`}
              >
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h3 className="text-lg font-medium flex-1">{item.name}</h3>
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
