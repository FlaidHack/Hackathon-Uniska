import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// TODO: business profile update, staff management CRUD
export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <Card>
        <CardTitle>Business Profile</CardTitle>
        <div className="mt-3 space-y-2">
          <Input placeholder="Nama bisnis" disabled />
          <Button disabled>Save Changes</Button>
        </div>
      </Card>

      <Card>
        <CardTitle>Staff</CardTitle>
        <p className="text-sm text-gray-400 mt-2">Belum ada data staff.</p>
      </Card>
    </div>
  );
}
