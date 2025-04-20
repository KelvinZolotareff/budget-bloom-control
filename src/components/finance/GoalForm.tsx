
import { useState } from "react";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Target } from "lucide-react";

export function GoalForm() {
  const { addGoal } = useFinance();
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !targetAmount) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o nome e valor alvo do objetivo.",
        variant: "destructive"
      });
      return;
    }
    
    const newGoal = {
      id: Date.now().toString(),
      name,
      targetAmount: parseFloat(targetAmount),
      currentAmount: currentAmount ? parseFloat(currentAmount) : 0,
      monthlyContribution: monthlyContribution ? parseFloat(monthlyContribution) : 0,
      createdAt: new Date().toISOString()
    };
    
    addGoal(newGoal);
    
    toast({
      title: "Objetivo adicionado",
      description: "Seu novo objetivo financeiro foi adicionado com sucesso."
    });
    
    // Limpar campos
    setName("");
    setTargetAmount("");
    setCurrentAmount("");
    setMonthlyContribution("");
  };
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Target className="h-5 w-5 text-budget-purple" />
        <h3 className="text-lg font-semibold">Novo Objetivo</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="goal-name">Nome do objetivo</Label>
          <Input
            id="goal-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Viagem, Casa própria, etc."
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="target-amount">Valor alvo (R$)</Label>
          <Input
            id="target-amount"
            type="number"
            step="0.01"
            min="0"
            value={targetAmount}
            onChange={(e) => setTargetAmount(e.target.value)}
            placeholder="10000.00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="current-amount">Valor atual (R$)</Label>
          <Input
            id="current-amount"
            type="number"
            step="0.01"
            min="0"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            placeholder="0.00"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="monthly-contribution">Contribuição mensal (R$)</Label>
          <Input
            id="monthly-contribution"
            type="number"
            step="0.01"
            min="0"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            placeholder="500.00"
          />
        </div>
        
        <Button type="submit" className="w-full bg-budget-purple hover:bg-budget-purple/90">
          Adicionar Objetivo
        </Button>
      </form>
    </div>
  );
}
