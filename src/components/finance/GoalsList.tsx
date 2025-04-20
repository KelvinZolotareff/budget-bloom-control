
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";
import { Target, Plus, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export function GoalsList() {
  const { goals, updateGoal, deleteGoal } = useFinance();
  
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
      description: `R$ ${amount.toFixed(2)} adicionado ao objetivo "${goal.name}".`
    });
  };
  
  const handleDeleteGoal = (goalId: string) => {
    deleteGoal(goalId);
    
    toast({
      title: "Objetivo removido",
      description: "Seu objetivo foi removido com sucesso."
    });
  };
  
  const calculateTimeToTarget = (goal: any) => {
    if (goal.currentAmount >= goal.targetAmount) {
      return "Meta atingida!";
    }
    
    if (!goal.monthlyContribution || goal.monthlyContribution <= 0) {
      return "Contribuição mensal necessária";
    }
    
    const remaining = goal.targetAmount - goal.currentAmount;
    const months = Math.ceil(remaining / goal.monthlyContribution);
    
    if (months <= 1) {
      return "Aproximadamente 1 mês";
    } else if (months < 12) {
      return `Aproximadamente ${months} meses`;
    } else {
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      if (remainingMonths === 0) {
        return `Aproximadamente ${years} ${years === 1 ? 'ano' : 'anos'}`;
      } else {
        return `Aproximadamente ${years} ${years === 1 ? 'ano' : 'anos'} e ${remainingMonths} ${remainingMonths === 1 ? 'mês' : 'meses'}`;
      }
    }
  };
  
  if (goals.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <Target className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Sem objetivos financeiros</h3>
        <p className="mt-2 text-muted-foreground">
          Crie seu primeiro objetivo para começar a planejar seu futuro financeiro.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Seus Objetivos Financeiros</h3>
      
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = goal.currentAmount / goal.targetAmount * 100;
          const progressFormatted = Math.min(100, Math.max(0, progress)).toFixed(1);
          
          return (
            <div 
              key={goal.id} 
              className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{goal.name}</h4>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDeleteGoal(goal.id)}
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Criado {formatDistanceToNow(new Date(goal.createdAt), { locale: ptBR, addSuffix: true })}
                </p>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">
                    R$ {goal.currentAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm font-medium">
                    R$ {goal.targetAmount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <Progress value={parseFloat(progressFormatted)} className="h-2" />
                
                <div className="mt-1 flex justify-between">
                  <span className="text-xs text-muted-foreground">
                    {progressFormatted}% completo
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Faltam: R$ {(goal.targetAmount - goal.currentAmount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm">
                    <p className="font-medium">
                      Contribuição mensal: R$ {goal.monthlyContribution.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {calculateTimeToTarget(goal)}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAddToGoal(goal.id, goal.monthlyContribution)}
                      className="border-budget-purple text-budget-purple hover:bg-budget-purple-light"
                    >
                      <Plus className="h-4 w-4 mr-1" /> Adicionar
                    </Button>
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
