import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import { Card, CardTitle, CardValue } from "@/components/ui/card";

// TODO: fetch dari lib/analytics.ts (belum diimplementasikan)
export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  const business = session?.user.businessId
    ? await db.business.findUnique({
        where: { id: session.user.businessId },
        select: { name: true },
      })
    : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">{business?.name ?? " "}</p>

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
