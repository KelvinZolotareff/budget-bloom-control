
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { GoalForm } from "@/components/finance/GoalForm";
import { GoalsList } from "@/components/finance/GoalsList";
import { Card, CardContent } from "@/components/ui/card";

const Objetivos = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Objetivos Financeiros</h1>
          <p className="text-muted-foreground mt-1">Defina metas e acompanhe seu progresso</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <GoalForm />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="border-none shadow-md h-full">
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
