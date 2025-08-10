"use client";

import { useEffect, useState } from "react";

type EventFromDB = {
  id: number;
  titleEN: string;
  titleIT: string;
  dateEN: string;
  dateIT: string;
  descEN: string;
  descIT: string;
  requiresReservation: boolean;
};

type LocalRow = {
  localId: string;
  id?: number;
  titleEN: string;
  titleIT: string;
  dateEN: string;
  dateIT: string;
  descEN: string;
  descIT: string;
  requiresReservation: boolean;
};

const API_EVENTS = "/api/admin/events";

function makeEmptyEvent(): Omit<EventFromDB, "id"> {
  return {
    titleEN: "",
    titleIT: "",
    dateEN: "",
    dateIT: "",
    descEN: "",
    descIT: "",
    requiresReservation: false,
  };
}

function makeLocalId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function AdminEventsPage() {
  const [rows, setRows] = useState<LocalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_EVENTS, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load events (${res.status})`);
      const json = await res.json();

      if (!Array.isArray(json.events)) throw new Error("Invalid data format");

      setRows(
        json.events.map((ev: EventFromDB) => ({
          localId: makeLocalId(),
          id: ev.id,
          titleEN: ev.titleEN,
          titleIT: ev.titleIT,
          dateEN: ev.dateEN,
          dateIT: ev.dateIT,
          descEN: ev.descEN,
          descIT: ev.descIT,
          requiresReservation: Boolean(ev.requiresReservation),
        }))
      );
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const updateField = <K extends keyof Omit<LocalRow, "localId" | "id">>(
    localId: string,
    field: K,
    value: LocalRow[K]
  ) => {
    setRows((prev) =>
      prev.map((r) => (r.localId === localId ? { ...r, [field]: value } : r))
    );
  };

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      { localId: makeLocalId(), ...makeEmptyEvent() },
    ]);
  };

  const deleteEvent = async (id: number, localId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_EVENTS}?id=${id}`, { method: "DELETE" });
      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Delete failed (${res.status}): ${text}`);
      }

      setRows((prev) => prev.filter((r) => r.localId !== localId));
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setDeletingId(null);
    }
  };

  const save = async () => {
    setSaving(true);
    setError(null);

    try {
      const existingItems = rows.filter((r) => typeof r.id === "number");
      const newItems = rows.filter((r) => r.id === undefined || r.id === null);

      const existingPayload = existingItems.map(
        ({
          id,
          titleEN,
          titleIT,
          dateEN,
          dateIT,
          descEN,
          descIT,
          requiresReservation,
        }) => ({
          id,
          titleEN,
          titleIT,
          dateEN,
          dateIT,
          descEN,
          descIT,
          requiresReservation,
        })
      );

      const newPayload = newItems.map(
        ({
          titleEN,
          titleIT,
          dateEN,
          dateIT,
          descEN,
          descIT,
          requiresReservation,
        }) => ({
          titleEN,
          titleIT,
          dateEN,
          dateIT,
          descEN,
          descIT,
          requiresReservation,
        })
      );

      if (existingPayload.length > 0) {
        const resPut = await fetch(API_EVENTS, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ events: existingPayload }),
        });

        if (!resPut.ok) {
          const text = await resPut.text().catch(() => "");
          throw new Error(`Update failed (${resPut.status}): ${text}`);
        }
      }

      if (newPayload.length > 0) {
        const resPost = await fetch(API_EVENTS, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ events: newPayload }),
        });

        if (!resPost.ok) {
          const text = await resPost.text().catch(() => "");
          throw new Error(`Insert failed (${resPost.status}): ${text}`);
        }
      }

      await fetchEvents();
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading events…</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Manage Events</h1>

      {error && <div className="text-red-600 text-center">{error}</div>}

      {rows.length === 0 ? (
        <div className="text-center">
          No events yet. Add one to get started.
        </div>
      ) : (
        rows.map((row, idx) => (
          <div
            key={row.localId}
            className="p-4 bg-white rounded shadow space-y-4"
          >
            <div className="flex gap-6 flex-wrap">
              <div className="flex-1 space-y-2 min-w-[280px]">
                <h3 className="font-medium">English — #{idx + 1}</h3>
                <input
                  placeholder="Title"
                  value={row.titleEN}
                  onChange={(e) =>
                    updateField(row.localId, "titleEN", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <input
                  placeholder="Date"
                  value={row.dateEN}
                  onChange={(e) =>
                    updateField(row.localId, "dateEN", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <textarea
                  placeholder="Description"
                  value={row.descEN}
                  onChange={(e) =>
                    updateField(row.localId, "descEN", e.target.value)
                  }
                  className="border px-2 py-1 w-full min-h-[60px]"
                />
              </div>
              <div className="flex-1 space-y-2 min-w-[280px]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">Italiano — #{idx + 1}</h3>
                  {row.id ? (
                    <button
                      onClick={() => deleteEvent(row.id!, row.localId)}
                      className="text-red-600 text-sm cursor-pointer"
                      disabled={deletingId === row.id}
                      aria-label={`Delete event #${idx + 1}`}
                    >
                      {deletingId === row.id ? "Deleting…" : "Delete"}
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        setRows((prev) =>
                          prev.filter((r) => r.localId !== row.localId)
                        )
                      }
                      className="text-red-600 text-sm"
                      aria-label={`Delete event #${idx + 1}`}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <input
                  placeholder="Titolo"
                  value={row.titleIT}
                  onChange={(e) =>
                    updateField(row.localId, "titleIT", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <input
                  placeholder="Data"
                  value={row.dateIT}
                  onChange={(e) =>
                    updateField(row.localId, "dateIT", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <textarea
                  placeholder="Descrizione"
                  value={row.descIT}
                  onChange={(e) =>
                    updateField(row.localId, "descIT", e.target.value)
                  }
                  className="border px-2 py-1 w-full min-h-[60px]"
                />
              </div>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={row.requiresReservation}
                onChange={(e) =>
                  updateField(
                    row.localId,
                    "requiresReservation",
                    e.target.checked
                  )
                }
              />
              Requires reservation / Richiede prenotazione
            </label>
          </div>
        ))
      )}

      {/* Buttons centered below the list */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={addRow}
          className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 cursor-pointer"
          disabled={saving || deletingId !== null}
          aria-label="Add new event"
        >
          + Add
        </button>
        <button
          onClick={save}
          disabled={saving || deletingId !== null}
          className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
          aria-label="Save events"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
