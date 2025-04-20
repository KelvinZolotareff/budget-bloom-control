
import { ReactNode } from "react";
import { FinanceProvider } from "@/contexts/FinanceContext";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate, useLocation } from "react-router-dom";
import { Home, LineChart, Target, List } from "lucide-react";

interface DashboardLayoutProps {
  children: ReactNode;
}
export function DashboardLayout({ children }: DashboardLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <FinanceProvider>
      <div className="min-h-screen flex flex-col w-full bg-gradient-to-br from-violet-200 via-white to-sky-100 animate-fade-in">
        {/* Menu estilo navegador */}
        <div className="sticky top-0 z-20 w-full shadow-lg animate-fade-in">
          <Tabs 
            value={currentPath}
            onValueChange={(value) => navigate(value)}
            className="w-full"
          >
            <div className="max-w-6xl mx-auto flex px-2">
              <TabsList className="flex-1 grid grid-cols-4 h-14 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-blue-400 shadow-2xl rounded-b-2xl overflow-hidden min-w-0">
                <TabsTrigger 
                  value="/" 
                  className="data-[state=active]:bg-white/90 data-[state=active]:text-violet-600 data-[state=active]:shadow-xl transition-all rounded-none h-full px-8 gap-2 font-bold text-lg group animate-scale-in"
                >
                  <Home className="w-5 h-5 group-data-[state=active]:text-violet-600" /> Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="/investimentos"
                  className="data-[state=active]:bg-white/90 data-[state=active]:text-blue-600 data-[state=active]:shadow-xl transition-all rounded-none h-full px-8 gap-2 font-bold text-lg group animate-scale-in"
                >
                  <LineChart className="w-5 h-5 group-data-[state=active]:text-blue-600" /> Investimentos
                </TabsTrigger>
                <TabsTrigger 
                  value="/objetivos" 
                  className="data-[state=active]:bg-white/90 data-[state=active]:text-fuchsia-700 data-[state=active]:shadow-xl transition-all rounded-none h-full px-8 gap-2 font-bold text-lg group animate-scale-in"
                >
                  <Target className="w-5 h-5 group-data-[state=active]:text-fuchsia-700" /> Objetivos
                </TabsTrigger>
                <TabsTrigger 
                  value="/pagamentos"
                  className="data-[state=active]:bg-white/90 data-[state=active]:text-orange-500 data-[state=active]:shadow-xl transition-all rounded-none h-full px-8 gap-2 font-bold text-lg group animate-scale-in"
                >
                  <List className="w-5 h-5 group-data-[state=active]:text-orange-500" /> Pagamentos
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </div>
        {/* Conteúdo mais centralizado */}
        <main className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-6xl py-8 px-4 h-full">{children}</div>
        </main>
      </div>
    </FinanceProvider>
  );
}

