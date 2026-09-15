"use client";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// TODO: form pilih produk + parameter skenario, call /api/simulate (lib/simulation.ts belum ada)
export default function SimulatorPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">What-If Simulator</h1>
      <p className="text-sm text-gray-500 mb-6">
        Coba skenario perubahan harga/diskon/biaya sebelum mengambil keputusan nyata.
      </p>

      <Card className="mb-4">
        <CardTitle>Pilih Produk & Skenario</CardTitle>
        <p className="text-sm text-gray-400 mt-2 mb-4">Form belum terhubung ke simulation engine.</p>
        <Button disabled>Simulasikan</Button>
      </Card>

      <Card>
        <CardTitle>Hasil</CardTitle>
        <p className="text-sm text-gray-400 mt-2">Belum ada hasil.</p>
      </Card>
    </div>
  );
}
