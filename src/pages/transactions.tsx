
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { Card } from "@/components/ui/card";

const Transactions = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground">
          View and manage all your financial transactions.
        </p>
        
        <Card className="p-6">
          <p className="text-center text-muted-foreground py-12">
            Transactions page is under construction. Coming soon!
          </p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Transactions;
