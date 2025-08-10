"use client";

import { useEffect, useState } from "react";

type MenuItemFromDB = {
  id: number;
  category: "pastries" | "coffee";
  name: string;
  price: number;
  descEN: string;
  descIT: string;
};

type LocalRow = {
  localId: string;
  id?: number;
  category: "pastries" | "coffee";
  name: string;
  price: number;
  descEN: string;
  descIT: string;
};

const API_MENU = "/api/admin/menu";

function makeEmptyMenuItem(): Omit<MenuItemFromDB, "id"> {
  return {
    category: "pastries",
    name: "",
    price: 0,
    descEN: "",
    descIT: "",
  };
}

function makeLocalId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;
}

export default function AdminMenuPage() {
  const [rows, setRows] = useState<LocalRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const fetchMenu = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_MENU, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed to load menu (${res.status})`);
      const json = await res.json();

      if (!Array.isArray(json.menu)) throw new Error("Invalid data format");

      setRows(
        json.menu.map((item: MenuItemFromDB) => ({
          localId: makeLocalId(),
          id: item.id,
          category: item.category,
          name: item.name,
          price: item.price,
          descEN: item.descEN,
          descIT: item.descIT,
        }))
      );
      setError(null);
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
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
      { localId: makeLocalId(), ...makeEmptyMenuItem() },
    ]);
  };

  const deleteMenuItem = async (id: number, localId: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_MENU}?id=${id}`, { method: "DELETE" });
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
        ({ id, category, name, price, descEN, descIT }) => ({
          id,
          category,
          name,
          price,
          descEN,
          descIT,
        })
      );

      const newPayload = newItems.map(
        ({ category, name, price, descEN, descIT }) => ({
          category,
          name,
          price,
          descEN,
          descIT,
        })
      );

      if (existingPayload.length > 0) {
        const resPut = await fetch(API_MENU, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menu: existingPayload }),
        });

        if (!resPut.ok) {
          const text = await resPut.text().catch(() => "");
          throw new Error(`Update failed (${resPut.status}): ${text}`);
        }
      }

      if (newPayload.length > 0) {
        const resPost = await fetch(API_MENU, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menu: newPayload }),
        });

        if (!resPost.ok) {
          const text = await resPost.text().catch(() => "");
          throw new Error(`Insert failed (${resPost.status}): ${text}`);
        }
      }

      await fetchMenu();
    } catch (err: unknown) {
      console.error(err);
      if (err instanceof Error) setError(err.message);
      else setError(String(err));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading menu…</div>;

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-center mb-6">Manage Menu</h1>

      {error && <div className="text-red-600 text-center">{error}</div>}

      {rows.length === 0 ? (
        <div className="text-center">
          No menu items yet. Add one to get started.
        </div>
      ) : (
        rows.map((row, idx) => (
          <div
            key={row.localId}
            className="p-4 bg-white rounded shadow space-y-4"
          >
            <div className="flex gap-6 flex-wrap">
              <div className="flex-1 space-y-2 min-w-[280px]">
                <h3 className="font-medium">Item #{idx + 1}</h3>

                <select
                  value={row.category}
                  onChange={(e) =>
                    updateField(
                      row.localId,
                      "category",
                      e.target.value as LocalRow["category"]
                    )
                  }
                  className="border px-2 py-1 w-full"
                >
                  <option value="pastries">Pastries</option>
                  <option value="coffee">Coffee</option>
                </select>

                <input
                  placeholder="Name"
                  value={row.name}
                  onChange={(e) =>
                    updateField(row.localId, "name", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={row.price}
                  step={0.01}
                  onChange={(e) =>
                    updateField(
                      row.localId,
                      "price",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="border px-2 py-1 w-full"
                />
              </div>
              <div className="flex-1 space-y-2 min-w-[280px]">
                <div className="flex justify-between items-center">
                  <h3>‎ </h3>
                  {row.id ? (
                    <button
                      onClick={() => deleteMenuItem(row.id!, row.localId)}
                      className="text-red-600 text-sm cursor-pointer"
                      disabled={deletingId === row.id}
                      aria-label={`Delete menu item #${idx + 1}`}
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
                      className="text-red-600 text-sm cursor-pointer"
                      aria-label={`Delete menu item #${idx + 1}`}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <input
                  placeholder="Description EN"
                  value={row.descEN}
                  onChange={(e) =>
                    updateField(row.localId, "descEN", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
                <input
                  placeholder="Description IT"
                  value={row.descIT}
                  onChange={(e) =>
                    updateField(row.localId, "descIT", e.target.value)
                  }
                  className="border px-2 py-1 w-full"
                />
              </div>
            </div>
          </div>
        ))
      )}

      {/* Buttons centered below the list */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={addRow}
          className="px-5 py-2 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-60 cursor-pointer"
          disabled={saving || deletingId !== null}
          aria-label="Add new menu item"
        >
          + Add
        </button>
        <button
          onClick={save}
          disabled={saving || deletingId !== null}
          className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 cursor-pointer"
          aria-label="Save menu"
        >
          {saving ? "Saving…" : "Save"}
        </button>
      </div>
    </div>
  );
}
