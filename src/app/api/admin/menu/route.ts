import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseserver";
import { revalidatePath } from "next/cache";

export type MenuItem = {
  id?: number;
  category: "pastries" | "coffee" | "";
  name: string;
  price: number;
  descEN: string;
  descIT: string;
};

const REVALIDATE_PATHS = [
  "/en/menu/coffee",
  "/en/menu/pastries",
  "/it/menu/coffee",
  "/it/menu/pastries",
];

async function revalidateMenuPages() {
  await Promise.all(REVALIDATE_PATHS.map((path) => revalidatePath(path)));
}

export async function GET() {
  const { data, error } = await supabaseServer
    .from("menu")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ menu: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let itemsToInsert: MenuItem[] = [];

    if (Array.isArray(body)) {
      itemsToInsert = body;
    } else if (Array.isArray(body.menu)) {
      itemsToInsert = body.menu;
    } else {
      itemsToInsert = [body];
    }

    if (itemsToInsert.length === 0) {
      return NextResponse.json(
        { error: "No items to insert" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from("menu").insert(itemsToInsert);

    if (error) {
      return NextResponse.json(
        { error: `Failed to insert new items: ${error.message}` },
        { status: 500 }
      );
    }

    await revalidateMenuPages();

    return NextResponse.json({ message: "Items inserted successfully" });
  } catch (err: unknown) {
    console.error("POST /api/admin/menu error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { menu } = await req.json();

    if (!Array.isArray(menu)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const menuItemsToUpdate = menu.filter((e) => typeof e.id === "number");

    for (const item of menuItemsToUpdate) {
      const { id, ...data } = item;
      const { error } = await supabaseServer
        .from("menu")
        .update(data)
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: `Failed to update id=${id}: ${error.message}` },
          { status: 500 }
        );
      }
    }

    await revalidateMenuPages();

    return NextResponse.json({ message: "Items updated successfully" });
  } catch (err: unknown) {
    console.error("PUT /api/admin/menu error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");

    if (!idParam) {
      return NextResponse.json(
        { error: "Missing id parameter" },
        { status: 400 }
      );
    }

    const id = Number(idParam);
    if (isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid id parameter" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer.from("menu").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `Failed to delete id=${id}: ${error.message}` },
        { status: 500 }
      );
    }

    await revalidateMenuPages();

    return NextResponse.json({ message: `Menu item id=${id} deleted` });
  } catch (err: unknown) {
    console.error("DELETE /api/admin/menu error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
