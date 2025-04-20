
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card } from "@/components/ui/card";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account preferences and settings.
        </p>
        
        <Card className="p-6">
          <p className="text-center text-muted-foreground py-12">
            Settings page is under construction. Coming soon!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
