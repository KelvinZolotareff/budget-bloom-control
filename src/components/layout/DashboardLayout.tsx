
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
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100 animate-fade-in">
        <Tabs 
          value={currentPath} 
          onValueChange={(value) => navigate(value)}
          className="w-full bg-white/70 border-b border-purple-200 shadow-sm"
        >
          <div className="max-w-5xl mx-auto">
            <TabsList className="bg-transparent h-14 gap-4 justify-center w-full">
              <TabsTrigger 
                value="/" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all rounded-xl h-full px-8 gap-2"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="/objetivos" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-400 data-[state=active]:to-purple-300 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all rounded-xl h-full px-8 gap-2"
              >
                <Target size={20} />
                <span>Objetivos</span>
              </TabsTrigger>

              <TabsTrigger 
                value="/pagamentos" 
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-400 data-[state=active]:to-pink-400 data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:scale-105 transition-all rounded-xl h-full px-8 gap-2"
              >
                <List size={20} />
                <span>Pagamentos</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </Tabs>
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-5xl py-6 px-4 h-full">
            {children}
          </div>
        </main>
      </div>
    </FinanceProvider>
  );
}
