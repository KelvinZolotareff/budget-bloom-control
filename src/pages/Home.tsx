
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Home = () => {
  const currentDate = format(new Date(), "MMMM yyyy", { locale: ptBR });
  const capitalizedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Acompanhe suas finanças de forma fácil e eficiente</p>
          </div>
          <p className="text-lg text-budget-purple font-semibold hidden sm:block">{capitalizedDate}</p>
        </div>
        
        <FinancialSummary />
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <TransactionForm />
          </div>
          <div className="md:col-span-2">
            <ExpenseChart />
          </div>
        </div>
        
        <TransactionList limit={5} />
      </div>
    </DashboardLayout>
  );
};

export default Home;
