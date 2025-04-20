
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FinancialSummary } from "@/components/dashboard/FinancialSummary";
import { ExpenseChart } from "@/components/dashboard/ExpenseChart";
import { MonthlyHistoryChart } from "@/components/dashboard/MonthlyHistoryChart";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const Home = () => {
  const now = new Date();
  const formattedDate = format(now, "dd 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: ptBR });
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] w-full animate-fade-in-fast">
        <div className="flex flex-row items-center justify-center text-lg font-bold mb-8 rounded-full px-8 py-2 shadow bg-gradient-to-r from-violet-400 via-pink-300 to-emerald-400 text-white animate-scale-in">
          <Calendar className="w-5 h-5 mr-2" />
          {capitalizedDate}
        </div>
        <div className="w-full flex flex-col gap-8 items-center justify-center pb-8">
          <div className="w-full max-w-4xl">
            <FinancialSummary />
          </div>
          <div className="grid gap-8 md:grid-cols-2 w-full justify-center">
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-tr from-purple-100 via-white to-violet-200 animate-scale-in">
              <CardContent className="p-0">
                <MonthlyHistoryChart />
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-none shadow-xl bg-gradient-to-br from-orange-100 via-pink-50 to-sky-100 animate-scale-in">
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

