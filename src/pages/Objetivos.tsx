
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GoalForm } from "@/components/finance/GoalForm";
import { GoalsList } from "@/components/finance/GoalsList";
import { Card, CardContent } from "@/components/ui/card";

const Objetivos = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in w-full h-full">
        <div>
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-500 via-violet-600 to-blue-400 bg-clip-text text-transparent">Objetivos Financeiros</h1>
          <p className="text-violet-800/80 mt-1 font-medium">Defina metas e acompanhe seu progresso de forma divertida!</p>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <GoalForm />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="border-none shadow-xl h-full">
              <CardContent className="p-6">
                <GoalsList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Objetivos;

