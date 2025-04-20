
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Target, Check, Trophy, CirclePlus, Plus } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import clsx from "clsx";

export function GoalsList() {
  const { goals, updateGoal, deleteGoal } = useFinance();
  const [customContribution, setCustomContribution] = useState<{[goalId: string]: string}>({});
  const [animateDone, setAnimateDone] = useState<{ [id: string]: boolean }>({});

  const ongoing = goals.filter(g => g.currentAmount < g.targetAmount);
  const finished = goals.filter(g => g.currentAmount >= g.targetAmount);

  const handleAddToGoal = (goalId: string, amount: number) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    const completed = goal.currentAmount + amount >= goal.targetAmount;
    const updatedGoal = {
      ...goal,
      currentAmount: goal.currentAmount + amount
    };
    updateGoal(updatedGoal);

    if (completed) {
      setAnimateDone(prev => ({ ...prev, [goalId]: true }));
      setTimeout(() => setAnimateDone(prev => ({ ...prev, [goalId]: false })), 2400);
    }

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

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-xl font-extrabold text-purple-700 mb-2">Seus Objetivos Financeiros</h3>
        
        {/* Objetivos em andamento */}
        <div className="space-y-8">
        {ongoing.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed rounded-lg animate-fade-in">
            <Target className="w-12 h-12 mx-auto text-violet-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-800">Sem objetivos financeiros</h3>
            <p className="mt-2 text-muted-foreground">
              Crie seu primeiro objetivo para começar a planejar seu futuro financeiro.
            </p>
          </div>
        )}
        {ongoing.map((goal) => {
          const progress = Math.min(100, Math.max(0, goal.currentAmount / goal.targetAmount * 100));
          return (
            <div 
              key={goal.id}
              className={clsx(
                "relative bg-gradient-to-r from-fuchsia-100 via-white to-violet-50 border-2 border-violet-200 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow animate-fade-in p-4",
                { "animate-pulse": progress > 80 && progress < 100 }
              )}
            >
              <div className="p-2 border-b bg-gradient-to-r from-violet-200/50 via-fuchsia-200/10 to-transparent flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-fuchsia-700">{goal.name}</h4>
                  <p className="text-xs text-muted-foreground">
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
              
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span className="text-md font-semibold text-violet-700">
                    R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-md font-semibold text-purple-800">
                    R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <Progress value={progress} className="h-3 bg-gradient-to-r from-purple-200 via-purple-400/30 to-purple-400 shadow-inner" />
                
                <div className="mt-2 flex justify-between items-center gap-2">
                  <span className="text-xs text-muted-foreground font-bold">
                    {progress.toFixed(1)}% completo
                  </span>
                  <span className="text-xs text-fuchsia-700 font-bold">
                    Faltam: R$ {(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="mt-4 flex flex-col md:flex-row items-center justify-start gap-3">
                  <Button 
                    variant="secondary"
                    size="sm"
                    onClick={() => handleAddToGoal(goal.id, goal.monthlyContribution)}
                    className="text-purple-700 border-2 border-purple-300 bg-white hover:bg-purple-100 shadow-sm font-semibold hover:scale-105 transition-all px-3 py-1 rounded-md"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar R${goal.monthlyContribution.toLocaleString('pt-BR', {minimumFractionDigits:0})}
                  </Button>
                  <div className="flex flex-row gap-2 items-center">
                    <input
                      type="number"
                      className="w-24 rounded border border-fuchsia-400 px-2 py-1 text-sm focus:outline-fuchsia-400 bg-white shadow"
                      placeholder="Outro valor"
                      min="1"
                      step="0.01"
                      value={customContribution[goal.id] || ""}
                      onChange={e => setCustomContribution({ ...customContribution, [goal.id]: e.target.value })}
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-gradient-to-r from-fuchsia-400 to-purple-400 text-white font-semibold px-2 py-1 hover:scale-105 transition-all"
                      onClick={() => handleAddCustom(goal.id)}
                    >
                      <CirclePlus className="h-4 w-4 mr-1" />
                      Adic.
                    </Button>
                  </div>
                  <div className="ml-auto">
                    <p className="text-xs text-muted-foreground">
                      {calculateTimeToTarget(goal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>

      {/* Objetivos concluídos */}
      {finished.length > 0 && (
        <div className="mt-8 w-full">
          <h3 className="text-xl font-extrabold text-emerald-600 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 animate-bounce" /> Objetivos Concluídos
          </h3>
          <div className="space-y-7">
            {finished.map(goal =>
              <div
                key={goal.id}
                className={clsx(
                  "relative bg-gradient-to-r from-emerald-200 via-white to-emerald-100 border-2 border-emerald-300 rounded-2xl overflow-hidden shadow-xl transition-all animate-fade-in p-5",
                  { "animate-bounce scale-105 ring-4 ring-emerald-400/40": animateDone[goal.id] }
                )}
              >
                <div className="flex items-center gap-3 mb-2">
                  <Check className="w-6 h-6 text-emerald-600 animate-bounce" />
                  <span className="font-bold text-emerald-800 text-lg">{goal.name}</span>
                </div>
                <Progress value={100} className="h-3 bg-emerald-400/70 shadow-inner" />
                <div className="flex justify-between items-end mt-1">
                  <span className="text-md font-bold text-emerald-700">
                    Alcançado: R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-xs text-emerald-700">Meta cumprida!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
