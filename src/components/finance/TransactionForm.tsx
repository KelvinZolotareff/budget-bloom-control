
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useFinance, TransactionType } from "@/contexts/FinanceContext";
import { format } from "date-fns";

const categories = {
  receita: ["Salário", "Freelance", "Investimentos", "Outros"],
  despesa: ["Alimentação", "Moradia", "Transporte", "Lazer", "Saúde", "Educação", "Outros"]
};

export function TransactionForm() {
  const { addTransaction } = useFinance();
  const { toast } = useToast();
  const [type, setType] = useState<TransactionType>("receita");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !category) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }
    
    addTransaction({
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: format(new Date(), "yyyy-MM-dd")
    });
    
    toast({
      title: "Sucesso",
      description: `${type === "receita" ? "Receita" : "Despesa"} adicionada com sucesso`
    });
    
    // Reset form
    setDescription("");
    setAmount("");
    setCategory("");
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Registrar Nova Transação</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select 
                value={type} 
                onValueChange={(value: TransactionType) => {
                  setType(value);
                  setCategory("");
                }}
              >
                <SelectTrigger id="type">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receita">Receita</SelectItem>
                  <SelectItem value="despesa">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                value={category} 
                onValueChange={setCategory}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories[type].map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compras no supermercado"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input 
              id="amount" 
              type="number" 
              step="0.01"
              min="0"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
            />
          </div>
          
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar {type === "receita" ? "Receita" : "Despesa"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
