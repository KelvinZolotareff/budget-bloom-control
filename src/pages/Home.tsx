
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { MonthlyHistoryChart } from "@/components/dashboard/MonthlyHistoryChart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";

const Home = () => {
  const currentDate = format(new Date(), "MMMM yyyy", { locale: ptBR });
  const capitalizedDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in-fast">
        <p className="text-lg text-budget-purple font-bold bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent mb-8 rounded-full px-5 py-2 shadow border border-gray-100">{capitalizedDate}</p>
        
        <div className="w-full flex flex-col gap-8 items-center">
          <div className="w-full max-w-4xl">
            <FinancialSummary />
          </div>

          <div className="grid gap-6 md:grid-cols-2 w-full justify-center">
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-tr from-purple-50 via-white to-violet-100 animate-scale-in">
              <CardContent className="p-0">
                <MonthlyHistoryChart />
              </CardContent>
            </Card>
            
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-purple-50 via-white to-sky-100 animate-scale-in">
              <CardContent className="p-0">
                <ExpenseChart />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
