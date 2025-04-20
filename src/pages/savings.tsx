
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";
import { Card } from "@/components/ui/card";

const Savings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Savings Goals</h1>
        <p className="text-muted-foreground">
          Track progress toward your financial goals.
        </p>
        
        <SavingsGoals />
        
        <Card className="p-6">
          <p className="text-center text-muted-foreground py-12">
            Additional savings management features coming soon!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Savings;
