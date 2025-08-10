import { NextRequest, NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseserver";
import { revalidatePath } from "next/cache";

export type EventItem = {
  id?: number;
  titleEN: string;
  titleIT: string;
  dateEN: string;
  dateIT: string;
  descEN: string;
  descIT: string;
  requiresReservation: boolean;
};

const REVALIDATE_PATHS = ["/en/events", "/it/events"];

async function revalidateEventPages() {
  await Promise.all(REVALIDATE_PATHS.map((path) => revalidatePath(path)));
}

export async function GET() {
  const { data, error } = await supabaseServer
    .from("events")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ events: data });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    let eventsToInsert: EventItem[] = [];

    if (Array.isArray(body)) {
      eventsToInsert = body;
    } else if (Array.isArray(body.events)) {
      eventsToInsert = body.events;
    } else {
      eventsToInsert = [body];
    }

    if (eventsToInsert.length === 0) {
      return NextResponse.json(
        { error: "No events to insert" },
        { status: 400 }
      );
    }

    const { error } = await supabaseServer
      .from("events")
      .insert(eventsToInsert);

    if (error) {
      return NextResponse.json(
        { error: `Failed to insert new events: ${error.message}` },
        { status: 500 }
      );
    }

    await revalidateEventPages();

    return NextResponse.json({ message: "Events inserted successfully" });
  } catch (err: unknown) {
    console.error("POST /api/admin/events error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { events } = await req.json();

    if (!Array.isArray(events)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const eventsToUpdate = events.filter((e) => typeof e.id === "number");

    for (const event of eventsToUpdate) {
      const { id, ...data } = event;
      const { error } = await supabaseServer
        .from("events")
        .update(data)
        .eq("id", id);

      if (error) {
        return NextResponse.json(
          { error: `Failed to update id=${id}: ${error.message}` },
          { status: 500 }
        );
      }
    }

    await revalidateEventPages();

    return NextResponse.json({ message: "Events updated successfully" });
  } catch (err: unknown) {
    console.error("PUT /api/admin/events error:", err);
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

    const { error } = await supabaseServer.from("events").delete().eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `Failed to delete id=${id}: ${error.message}` },
        { status: 500 }
      );
    }

    await revalidateEventPages();

    return NextResponse.json({ message: `Event id=${id} deleted` });
  } catch (err: unknown) {
    console.error("DELETE /api/admin/events error:", err);
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
