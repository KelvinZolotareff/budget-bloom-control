
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { BudgetTracker } from "@/components/dashboard/BudgetTracker";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { SavingsGoals } from "@/components/dashboard/SavingsGoals";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-lg text-budget-purple font-semibold">April 2025</p>
        </div>
        
        <FinancialSummary />
        
        <div className="grid gap-6 md:grid-cols-2">
          <ExpenseChart />
          <BudgetTracker />
        </div>
        
        <TransactionList />
        
        <SavingsGoals />
      </div>
    </DashboardLayout>
  );
};

export default Index;
