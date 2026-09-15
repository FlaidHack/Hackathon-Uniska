import { Card, CardTitle, CardValue } from "@/components/ui/card";

// TODO: fetch dari lib/analytics.ts (belum diimplementasikan)
export default function DashboardPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardTitle>Total Revenue</CardTitle>
          <CardValue>—</CardValue>
        </Card>
        <Card>
          <CardTitle>Total Profit</CardTitle>
          <CardValue>—</CardValue>
        </Card>
        <Card>
          <CardTitle>Margin Rata-rata</CardTitle>
          <CardValue>—</CardValue>
        </Card>
      </div>

      <Card className="mb-6">
        <CardTitle>Top Produk</CardTitle>
        <p className="text-sm text-gray-400 mt-2">Belum ada data — analytics engine belum di-wire.</p>
      </Card>

      <Card>
        <CardTitle>Insight Otomatis</CardTitle>
        <p className="text-sm text-gray-400 mt-2">Belum ada data — insight rules belum di-wire.</p>
      </Card>
    </div>
  );
}
