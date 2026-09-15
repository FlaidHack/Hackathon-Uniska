import { Card, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StaffManager } from "@/components/StaffManager";

// TODO: business profile update masih placeholder
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

      <StaffManager />
    </div>
  );
}
