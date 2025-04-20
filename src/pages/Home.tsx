
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { MonthlyHistoryChart } from "@/components/dashboard/MonthlyHistoryChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { TransactionForm } from "@/components/finance/TransactionForm";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const currentDate = format(new Date(), "MMMM yyyy", { locale: ptBR });
  const capitalizedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-800">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Acompanhe suas finanças de forma fácil e eficiente</p>
          </div>
          <p className="text-lg text-budget-purple font-semibold hidden sm:block bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">{capitalizedDate}</p>
        </div>
        
        <FinancialSummary />
        
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-0">
              <MonthlyHistoryChart />
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-0">
              <ExpenseChart />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <TransactionForm />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <TransactionList limit={5} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
