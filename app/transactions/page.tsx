import { Table, Thead, Th, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// TODO: fetch transactions (Owner: semua, Staff: miliknya sendiri), form tambah transaksi
export default function TransactionsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <Button>+ Tambah Transaksi</Button>
      </div>

      <Table>
        <Thead>
          <tr>
            <Th>Tanggal</Th>
            <Th>Produk</Th>
            <Th>Qty</Th>
            <Th>Total</Th>
          </tr>
        </Thead>
        <tbody>
          <tr>
            <Td colSpan={4}>
              <span className="text-gray-400">Belum ada data — belum terhubung ke database.</span>
            </Td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
