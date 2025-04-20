import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ChartBarIcon, LineChart, PlusCircle, Trash2, TrendingDown, TrendingUp } from "lucide-react";
import { Investment, useFinance } from "@/contexts/FinanceContext";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const investmentTypes = [
  "Renda Fixa",
  "Renda Variável", 
  "Fundos Imobiliários",
  "Criptomoedas",
  "Poupança",
  "Outros"
];

export function InvestmentForm() {
  const { addInvestment } = useFinance();
  const { toast } = useToast();
  
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [value, setValue] = useState("");
  const [initialDate, setInitialDate] = useState(format(new Date(), "yyyy-MM-dd"));
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !type || !value || !initialDate) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        variant: "destructive"
      });
      return;
    }
    
    addInvestment({
      name,
      type,
      value: parseFloat(value),
      initialDate,
      currentValue: parseFloat(value),
      growth: 0
    });
    
    toast({
      title: "Sucesso",
      description: "Investimento adicionado com sucesso"
    });
    
    setName("");
    setType("");
    setValue("");
    setInitialDate(format(new Date(), "yyyy-MM-dd"));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Adicionar Investimento</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome do Investimento</Label>
            <Input 
              id="name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Tesouro Direto"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Tipo</Label>
            <Select 
              value={type} 
              onValueChange={setType}
            >
              <SelectTrigger id="type">
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {investmentTypes.map(invType => (
                  <SelectItem key={invType} value={invType}>{invType}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor (R$)</Label>
              <Input 
                id="value" 
                type="number" 
                step="0.01"
                min="0"
                value={value} 
                onChange={(e) => setValue(e.target.value)}
                placeholder="0,00"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="initialDate">Data do Investimento</Label>
              <Input 
                id="initialDate" 
                type="date" 
                value={initialDate} 
                onChange={(e) => setInitialDate(e.target.value)}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            Adicionar Investimento
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function InvestmentList() {
  const { investments, deleteInvestment, updateInvestmentValue } = useFinance();
  const { toast } = useToast();
  const [newValues, setNewValues] = useState<Record<string, string>>({});
  
  const handleDelete = (id: string) => {
    deleteInvestment(id);
    toast({
      title: "Sucesso",
      description: "Investimento excluído com sucesso"
    });
  };
  
  const handleUpdateValue = (investment: Investment) => {
    const newValue = parseFloat(newValues[investment.id] || "0");
    if (!newValue || isNaN(newValue)) {
      toast({
        title: "Erro",
        description: "Digite um valor válido",
        variant: "destructive"
      });
      return;
    }
    
    updateInvestmentValue(investment.id, newValue);
    
    setNewValues(prev => ({
      ...prev,
      [investment.id]: ""
    }));
    
    toast({
      title: "Sucesso",
      description: "Valor atualizado com sucesso"
    });
  };
  
  const totalInvested = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + (inv.currentValue || inv.value), 0);
  const totalGrowth = totalInvested > 0 ? ((totalCurrent - totalInvested) / totalInvested) * 100 : 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Meus Investimentos</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="text-sm text-muted-foreground">Total Investido:</div>
          <div className="font-semibold">R$ {totalInvested.toLocaleString('pt-BR', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}</div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Data</TableHead>
              <TableHead className="text-right">Valor Inicial</TableHead>
              <TableHead className="text-right">Valor Atual</TableHead>
              <TableHead className="text-right">Variação</TableHead>
              <TableHead className="text-center">Atualizar</TableHead>
              <TableHead className="w-[80px]">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {investments.length > 0 ? (
              investments.map((investment) => (
                <TableRow key={investment.id}>
                  <TableCell>{investment.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {investment.type === "Renda Fixa" ? (
                        <LineChart className="h-4 w-4 text-blue-500" />
                      ) : investment.type === "Renda Variável" ? (
                        <ChartBarIcon className="h-4 w-4 text-purple-500" />
                      ) : (
                        <LineChart className="h-4 w-4 text-gray-500" />
                      )}
                      {investment.type}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(parseISO(investment.initialDate), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {investment.value.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    R$ {(investment.currentValue || investment.value).toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    (investment.growth || 0) >= 0 ? 'text-green-600' : 'text-red-500'
                  }`}>
                    <div className="flex items-center justify-end gap-1">
                      {(investment.growth || 0) >= 0 ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                      {Math.abs(investment.growth || 0).toFixed(2)}%
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Input 
                        type="number" 
                        step="0.01"
                        placeholder="Novo valor"
                        value={newValues[investment.id] || ""}
                        onChange={(e) => setNewValues(prev => ({
                          ...prev,
                          [investment.id]: e.target.value
                        }))}
                        className="w-24 h-8"
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleUpdateValue(investment)}
                        className="h-8"
                      >
                        OK
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleDelete(investment.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  Nenhum investimento encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

const InvestmentSummary = () => {
  const { investments } = useFinance();
  
  const totalInvested = investments.reduce((acc, inv) => acc + inv.value, 0);
  const totalCurrent = investments.reduce((acc, inv) => acc + (inv.currentValue || inv.value), 0);
  const diff = totalCurrent - totalInvested;
  const isPositive = diff >= 0;
  
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="bg-purple-50">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Total Investido</div>
          <div className="text-2xl font-bold mt-2">
            R$ {totalInvested.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
      <Card className="bg-blue-50">
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Valor Atual</div>
          <div className="text-2xl font-bold mt-2">
            R$ {totalCurrent.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
      <Card className={isPositive ? 'bg-green-50' : 'bg-red-50'}>
        <CardContent className="p-4">
          <div className="text-sm text-muted-foreground">Lucro/Prejuízo</div>
          <div className="text-2xl font-bold mt-2 flex items-center">
            {isPositive ? (
              <TrendingUp className="h-5 w-5 mr-1 text-green-500" />
            ) : (
              <TrendingDown className="h-5 w-5 mr-1 text-red-500" />
            )}
            <span className={`${isPositive ? 'text-green-600' : 'text-red-500'}`}>
              {isPositive ? '+' : ''}
              R$ {diff.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const Investimentos = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investimentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie sua carteira de investimentos</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <InvestmentForm />
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent>
                <InvestmentSummary />
              </CardContent>
            </Card>
          </div>
        </div>
        
        <InvestmentList />
      </div>
    </DashboardLayout>
  );
};

export default Investimentos;
