import { setRequestLocale } from "next-intl/server";
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
  const locales = ["en", "it"]; // Supported locales
  const categories = ["coffee", "pastries"];

  return locales.flatMap((locale) =>
    categories.map((category) => ({ locale, category }))
  );
}

type Props = {
  params: Promise<{
    locale: string;
    category: string;
  }>;
};

async function getMenuData(locale: string): Promise<MenuData> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public/locales",
      locale,
      "menu.json"
    );

    console.log(`Attempting to read file: ${filePath}`);
    console.log(`Current locale: ${locale}`);

    const fileData = await fs.readFile(filePath, "utf-8");
    const parsedData = JSON.parse(fileData);

    // Validate the structure
    if (!parsedData.coffee || !parsedData.pastries) {
      throw new Error(`Invalid menu structure for locale: ${locale}`);
    }

    console.log(`Successfully loaded menu data for locale: ${locale}`);
    console.log(`Menu data keys:`, Object.keys(parsedData));
    return parsedData;
  } catch (error) {
    console.error(`Error loading menu data for locale ${locale}:`, error);
    throw error;
  }
}

export default async function MenuCategoryPage({ params }: Props) {
  console.log("=== MenuCategoryPage started ===");

  try {
    console.log("Step 1: Awaiting params...");
    const resolvedParams = await params;
    console.log("Step 2: Params resolved:", resolvedParams);

    const { locale, category } = resolvedParams;
    console.log(`Step 3: Locale: ${locale}, Category: ${category}`);

    setRequestLocale(locale);
    console.log(`Step 4: Set request locale to: ${locale}`);

    console.log("Step 5: Validating category...");
    if (!VALID_CATEGORIES.includes(category as Category)) {
      console.log(`Step 6: Invalid category: ${category}, returning notFound`);
      return notFound();
    }
    console.log("Step 6: Category is valid");

    console.log("Step 7: Loading menu data...");
    const menu = await getMenuData(locale);
    console.log(`Step 8: Menu loaded successfully for locale: ${locale}`);

    console.log("Step 9: Getting category data...");
    const categoryData = menu[category as Category];
    console.log(`Step 10: Category data:`, categoryData);

    if (!categoryData || !categoryData.items?.length) {
      console.log(
        `Step 11: No data found for category: ${category}, returning notFound`
      );
      return notFound();
    }
    console.log("Step 11: Category data is valid");

    const { title, items } = categoryData;
    console.log(
      `Step 12: Rendering ${items.length} items for category: ${category}`
    );

    console.log("Step 13: Starting render...");
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
  } catch (error) {
    console.error("=== ERROR in MenuCategoryPage ===");
    console.error("Error details:", error);
    console.error(
      "Error stack:",
      error instanceof Error ? error.stack : "No stack trace"
    );
    console.error("=== END ERROR ===");
    return notFound();
  }
}
