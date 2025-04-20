
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Target, Plus, CirclePlus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

export function GoalsList() {
  const { goals, updateGoal, deleteGoal } = useFinance();
  const [customContribution, setCustomContribution] = useState<{[goalId: string]: string}>({});

  const handleAddToGoal = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const updatedGoal = {
      ...goal,
      currentAmount: goal.currentAmount + amount
    };
    updateGoal(updatedGoal);
    toast({
      title: "Valor adicionado",
      description: `R$ ${amount.toLocaleString('pt-BR', {minimumFractionDigits:2})} adicionado ao objetivo "${goal.name}".`
    });
  };

  const handleAddCustom = (goalId: string) => {
    const val = parseFloat(customContribution[goalId]?.replace(",", ".") || "0");
    if (isNaN(val) || val <= 0) return;
    handleAddToGoal(goalId, val);
    setCustomContribution({ ...customContribution, [goalId]: "" });
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoal(goalId);
    toast({
      title: "Objetivo removido",
      description: "Seu objetivo foi removido com sucesso."
    });
  };

  const calculateTimeToTarget = (goal: any) => {
    if (goal.currentAmount >= goal.targetAmount) return "Meta atingida!";
    if (!goal.monthlyContribution || goal.monthlyContribution <= 0) return "Contribuição mensal necessária";
    const remaining = goal.targetAmount - goal.currentAmount;
    const months = Math.ceil(remaining / goal.monthlyContribution);
    if (months <= 1) return "Aproximadamente 1 mês";
    else if (months < 12) return `Aproximadamente ${months} meses`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return `Aproximadamente ${years} ${years === 1 ? 'ano' : 'anos'}`;
    return `Aproximadamente ${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
  };

  if (goals.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg animate-fade-in">
        <Target className="w-12 h-12 mx-auto text-violet-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-800">Sem objetivos financeiros</h3>
        <p className="mt-2 text-muted-foreground">
          Crie seu primeiro objetivo para começar a planejar seu futuro financeiro.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-purple-700">Seus Objetivos Financeiros</h3>
      <div className="space-y-8">
        {goals.map((goal) => {
          const progress = goal.currentAmount / goal.targetAmount * 100;
          const progressFormatted = Math.min(100, Math.max(0, progress)).toFixed(1);

          return (
            <div 
              key={goal.id} 
              className="bg-gradient-to-r from-violet-100 via-white to-purple-50 border rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow animate-fade-in"
            >
              <div className="p-4 border-b bg-gradient-to-r from-purple-200/50 to-transparent flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-purple-900">{goal.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Criado {formatDistanceToNow(new Date(goal.createdAt), { locale: ptBR, addSuffix: true })}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDeleteGoal(goal.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-all"
                >
                  <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="10" fill="#fee2e2"/><path d="M6 10h8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/><path d="M10 6v8" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/></svg>
                </Button>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-md font-semibold text-indigo-700">
                    R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-md font-semibold text-purple-800">
                    R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <Progress value={parseFloat(progressFormatted)} className="h-3 bg-gradient-to-r from-purple-200 via-purple-400/30 to-purple-400" />
                
                <div className="mt-1 flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">
                    {progressFormatted}% completo
                  </span>
                  <span className="text-xs text-fuchsia-700 font-bold">
                    Faltam: R$ {(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-2">
                  <div className="flex-1">
                    <p className="font-medium text-purple-800">
                      Contribuição mensal: <span className="font-bold">R$ {goal.monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculateTimeToTarget(goal)}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 items-center">
                    {/* Botão de adicionar com a contribuição padrão */}
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToGoal(goal.id, goal.monthlyContribution)}
                      className="border-2 border-purple-400 text-purple-700 hover:bg-purple-100 bg-white shadow-sm font-semibold animate-pulse focus:scale-105 transition-all"
                    >
                      <Plus className="h-4 w-4 mr-1" />Adicionar R${goal.monthlyContribution.toLocaleString('pt-BR', {minimumFractionDigits:0})}
                    </Button>
                    {/* Campo para valor customizado */}
                    <div className="flex flex-row gap-2 items-center">
                      <input
                        type="number"
                        className="w-24 rounded border border-purple-200 px-2 py-1 text-sm focus:outline-purple-400 bg-white shadow"
                        placeholder="Outro valor"
                        min="1"
                        step="0.01"
                        value={customContribution[goal.id] || ""}
                        onChange={e => setCustomContribution({ ...customContribution, [goal.id]: e.target.value })}
                      />
                      <Button
                        variant="secondary"
                        size="sm"
                        className="bg-gradient-to-r from-pink-400 to-purple-300 text-white font-semibold px-2 py-1 hover:scale-105 transition-all"
                        onClick={() => handleAddCustom(goal.id)}
                      >
                        <CirclePlus className="h-4 w-4 mr-1" />
                        Adic.
                      </Button>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
