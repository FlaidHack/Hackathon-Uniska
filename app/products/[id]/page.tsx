import { Card, CardTitle, CardValue } from "@/components/ui/card";

// TODO: fetch product detail + performance dari lib/analytics.ts
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Product Detail</h1>
      <p className="text-sm text-gray-400 mb-6">ID: {id}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardTitle>Qty Terjual</CardTitle>
          <CardValue>—</CardValue>
        </Card>
        <Card>
          <CardTitle>Revenue</CardTitle>
          <CardValue>—</CardValue>
        </Card>
        <Card>
          <CardTitle>Margin</CardTitle>
          <CardValue>—</CardValue>
        </Card>
      </div>
    </div>
  );
}
