"use client";
import { useEffect, useState } from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface StaffMember {
  id: string;
  email: string;
  name: string | null;
  createdAt: string;
}

export function StaffManager() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const loadStaff = async () => {
    const res = await fetch("/api/staff");
    if (res.ok) {
      const data = await res.json();
      setStaff(data.staff);
    }
    setLoading(false);
  };

  useEffect(() => {
    let ignore = false;

    async function load() {
      const res = await fetch("/api/staff");
      if (ignore) return;
      if (res.ok) {
        const data = await res.json();
        setStaff(data.staff);
      }
      setLoading(false);
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddStaff = async () => {
    setError(null);
    setSubmitting(true);
    const res = await fetch("/api/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSubmitting(false);

    if (!res.ok) {
      const data = await res.json();
      setError(data.error ?? "Gagal menambah staff");
      return;
    }

    setForm({ name: "", email: "", password: "" });
    loadStaff();
  };

  return (
    <Card>
      <CardTitle>Staff</CardTitle>

      {loading ? (
        <p className="text-sm text-gray-400 mt-2">Memuat...</p>
      ) : staff.length === 0 ? (
        <p className="text-sm text-gray-400 mt-2 mb-4">Belum ada staff.</p>
      ) : (
        <ul className="mt-2 mb-4 divide-y divide-gray-100">
          {staff.map((s) => (
            <li key={s.id} className="py-2 flex justify-between text-sm">
              <span className="text-gray-900">{s.name ?? "(tanpa nama)"}</span>
              <span className="text-gray-500">{s.email}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="border-t border-gray-100 pt-4 space-y-2">
        <p className="text-xs font-medium text-gray-600">Tambah Staff Baru</p>
        <Input
          placeholder="Nama"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <Input
          placeholder="Password awal (min. 6 karakter)"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button onClick={handleAddStaff} disabled={submitting}>
          {submitting ? "Menyimpan..." : "+ Tambah Staff"}
        </Button>
        <p className="text-xs text-gray-400">
          Beri tahu staff password awal ini secara manual — belum ada flow reset password.
        </p>
      </div>
    </Card>
  );
}
