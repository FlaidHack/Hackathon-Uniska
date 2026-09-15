import { Table, Thead, Th, Td } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// TODO: fetch products dari db, role check (Staff: sembunyikan costPrice)
export default function ProductsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Button>+ Tambah Produk</Button>
      </div>

      <Table>
        <Thead>
          <tr>
            <Th>Nama</Th>
            <Th>Harga Jual</Th>
            <Th>Harga Modal</Th>
            <Th>Aksi</Th>
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
