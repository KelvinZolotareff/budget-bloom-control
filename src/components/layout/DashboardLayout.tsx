
import { ReactNode } from "react";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, CreditCard, LineChart, Target, List } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <FinanceProvider>
      <div className="min-h-screen flex flex-col w-full bg-slate-50">
        <header className="bg-gradient-to-r from-budget-purple to-purple-600 text-white py-4 px-6 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">FinControl</span>
            </div>
          </div>
        </header>

        <Tabs 
          value={currentPath} 
          onValueChange={(value) => navigate(value)}
          className="w-full bg-white border-b border-gray-200 shadow-sm"
        >
          <div className="container mx-auto">
            <TabsList className="bg-transparent h-14">
              <TabsTrigger 
                value="/" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-budget-purple data-[state=active]:shadow-none rounded-none h-full px-6 gap-2"
              >
                <Home size={18} />
                <span>Dashboard</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="/transacoes" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-budget-purple data-[state=active]:shadow-none rounded-none h-full px-6 gap-2"
              >
                <CreditCard size={18} />
                <span>Transações</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="/investimentos" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-budget-purple data-[state=active]:shadow-none rounded-none h-full px-6 gap-2"
              >
                <LineChart size={18} />
                <span>Investimentos</span>
              </TabsTrigger>

              <TabsTrigger 
                value="/objetivos" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-budget-purple data-[state=active]:shadow-none rounded-none h-full px-6 gap-2"
              >
                <Target size={18} />
                <span>Objetivos</span>
              </TabsTrigger>

              <TabsTrigger 
                value="/pagamentos" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-budget-purple data-[state=active]:shadow-none rounded-none h-full px-6 gap-2"
              >
                <List size={18} />
                <span>Pagamentos</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>

        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 h-full">
            {children}
          </div>
        </main>
      </div>
    </FinanceProvider>
  );
}
