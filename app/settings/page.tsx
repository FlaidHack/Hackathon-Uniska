import { BusinessProfileForm } from "@/components/BusinessProfileForm";
import { StaffManager } from "@/components/StaffManager";

export default function SettingsPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Settings</h1>

      <BusinessProfileForm />

      <StaffManager />
    </div>
  );
}
