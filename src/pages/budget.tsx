
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { BudgetTracker } from "@/components/dashboard/BudgetTracker";
import { Card } from "@/components/ui/card";

const Budget = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Budget</h1>
        <p className="text-muted-foreground">
          Track and manage your monthly budgets by category.
        </p>
        
        <BudgetTracker />
        
        <Card className="p-6">
          <p className="text-center text-muted-foreground py-12">
            Budget management features coming soon!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
