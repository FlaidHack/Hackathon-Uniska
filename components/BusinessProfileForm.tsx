"use client";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BusinessProfileForm() {
  const [name, setName] = useState("");
  const [initialName, setInitialName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function load() {
      const res = await fetch("/api/business");
      if (ignore) return;
      if (res.ok) {
        const data = await res.json();
        setName(data.business.name);
        setInitialName(data.business.name);
      }
      setLoading(false);
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const dirty = name.trim() !== initialName && name.trim().length > 0;

  const handleSave = async () => {
    setError(null);
    setSuccess(false);
    setSaving(true);
    const res = await fetch("/api/business", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setSaving(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal menyimpan nama bisnis");
      return;
    }

    const data = await res.json();
    setName(data.business.name);
    setInitialName(data.business.name);
    setSuccess(true);
    // Sidebar ikut refresh tanpa reload halaman
    window.dispatchEvent(new Event("business-updated"));
  };

  return (
    <Card>
      <CardTitle>Business Profile</CardTitle>

      {loading ? (
        <p className="text-sm text-gray-400 mt-2">Memuat...</p>
      ) : (
        <div className="mt-3 space-y-2">
          <Input
            placeholder="Nama bisnis"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setSuccess(false);
            }}
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          {success && <p className="text-sm text-teal-700">Nama bisnis tersimpan.</p>}
          <Button onClick={handleSave} disabled={saving || !dirty}>
            {saving ? "Menyimpan..." : "Save Changes"}
          </Button>
        </div>
      )}
    </Card>
  );
}
