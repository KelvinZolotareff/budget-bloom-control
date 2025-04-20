
import { useState } from "react";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { List, CreditCard } from "lucide-react";

export function PaymentsForm() {
  const { addPayment, createNewCardIfNotExists } = useFinance();
  
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDay, setDueDay] = useState("");
  const [isRecurring, setIsRecurring] = useState(false);
  const [isInstallment, setIsInstallment] = useState(false);
  const [totalInstallments, setTotalInstallments] = useState("");
  const [currentInstallment, setCurrentInstallment] = useState("");
  const [cardName, setCardName] = useState("");
  const [newCardName, setNewCardName] = useState("");
  const [showNewCardField, setShowNewCardField] = useState(false);
  
  const { cards } = useFinance();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description || !amount || !dueDay) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    // Se for um cartão novo
    let selectedCard = cardName;
    if (showNewCardField && newCardName) {
      createNewCardIfNotExists(newCardName);
      selectedCard = newCardName;
    }
    
    // Validar instalamentos
    if (isInstallment) {
      if (!totalInstallments || !currentInstallment) {
        toast({
          title: "Campos obrigatórios",
          description: "Para pagamentos parcelados, informe o número de parcelas e parcela atual.",
          variant: "destructive"
        });
        return;
      }
      
      if (parseInt(currentInstallment) > parseInt(totalInstallments)) {
        toast({
          title: "Valor inválido",
          description: "A parcela atual não pode ser maior que o número total de parcelas.",
          variant: "destructive"
        });
        return;
      }
    }
    
    const newPayment = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      dueDay: parseInt(dueDay),
      isRecurring,
      isPaid: false,
      createdAt: new Date().toISOString(),
      cardName: selectedCard || null,
      ...(isInstallment && {
        isInstallment,
        totalInstallments: parseInt(totalInstallments),
        currentInstallment: parseInt(currentInstallment)
      })
    };
    
    addPayment(newPayment);
    
    toast({
      title: "Pagamento adicionado",
      description: "Seu novo pagamento foi adicionado com sucesso."
    });
    
    // Limpar campos
    setDescription("");
    setAmount("");
    setDueDay("");
    setIsRecurring(false);
    setIsInstallment(false);
    setTotalInstallments("");
    setCurrentInstallment("");
    setCardName("");
    setNewCardName("");
    setShowNewCardField(false);
  };
  
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <List className="h-5 w-5 text-budget-purple" />
        <h3 className="text-lg font-semibold">Novo Pagamento</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Netflix, Conta de luz, etc."
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
            placeholder="99.90"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="due-day">Dia de vencimento</Label>
          <Input
            id="due-day"
            type="number"
            min="1"
            max="31"
            value={dueDay}
            onChange={(e) => setDueDay(e.target.value)}
            placeholder="10"
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="recurring"
            checked={isRecurring}
            onCheckedChange={setIsRecurring}
          />
          <Label htmlFor="recurring">Pagamento recorrente (mensal)</Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="installment"
            checked={isInstallment}
            onCheckedChange={setIsInstallment}
          />
          <Label htmlFor="installment">Pagamento parcelado</Label>
        </div>
        
        {isInstallment && (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="total-installments">Total de parcelas</Label>
              <Input
                id="total-installments"
                type="number"
                min="2"
                value={totalInstallments}
                onChange={(e) => setTotalInstallments(e.target.value)}
                placeholder="12"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-installment">Parcela atual</Label>
              <Input
                id="current-installment"
                type="number"
                min="1"
                value={currentInstallment}
                onChange={(e) => setCurrentInstallment(e.target.value)}
                placeholder="1"
              />
            </div>
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="card">Cartão de crédito (opcional)</Label>
          <Select 
            value={cardName} 
            onValueChange={(value) => {
              if (value === "new") {
                setShowNewCardField(true);
                setCardName("");
              } else {
                setShowNewCardField(false);
                setCardName(value);
              }
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cartão" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nenhum">Nenhum</SelectItem>
              {cards.map((card) => (
                <SelectItem key={card.id} value={card.name}>
                  {card.name}
                </SelectItem>
              ))}
              <SelectItem value="new">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-4 w-4" />
                  <span>Adicionar novo cartão</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {showNewCardField && (
          <div className="space-y-2">
            <Label htmlFor="new-card-name">Nome do novo cartão</Label>
            <Input
              id="new-card-name"
              type="text"
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              placeholder="Nubank, Itaú, etc."
            />
          </div>
        )}
        
        <Button type="submit" className="w-full bg-budget-purple hover:bg-budget-purple/90">
          Adicionar Pagamento
        </Button>
      </form>
    </div>
  );
}
