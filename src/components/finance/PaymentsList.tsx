
import { useState } from "react";
import { useFinance } from "@/contexts/FinanceContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Check, CreditCard, Trash2, CalendarCheck } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function PaymentsList() {
  const { payments, updatePayment, deletePayment } = useFinance();
  const [filter, setFilter] = useState<"all" | "pending" | "paid">("all");
  
  const currentDate = new Date();
  const currentMonth = format(currentDate, "MMMM", { locale: ptBR });
  const capitalizedMonth = currentMonth.charAt(0).toUpperCase() + currentMonth.slice(1);
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();
  
  const filteredPayments = payments.filter(payment => {
    if (filter === "pending") return !payment.isPaid;
    if (filter === "paid") return payment.isPaid;
    return true;
  });
  
  const handleTogglePaid = (paymentId: string) => {
    const payment = payments.find(p => p.id === paymentId);
    if (!payment) return;
    
    const updatedPayment = {
      ...payment,
      isPaid: !payment.isPaid
    };
    
    updatePayment(updatedPayment);
    
    toast({
      title: updatedPayment.isPaid ? "Pagamento marcado como pago" : "Pagamento marcado como pendente",
      description: updatedPayment.isPaid 
        ? `"${payment.description}" foi marcado como pago.` 
        : `"${payment.description}" foi marcado como pendente.`
    });
  };
  
  const handleDeletePayment = (paymentId: string) => {
    deletePayment(paymentId);
    
    toast({
      title: "Pagamento removido",
      description: "O pagamento foi removido com sucesso."
    });
  };
  
  const getPaymentStatus = (payment: any) => {
    if (payment.isPaid) {
      return { 
        status: "Pago", 
        color: "text-green-500 bg-green-50" 
      };
    }
    
    if (payment.dueDay < currentDay) {
      return { 
        status: "Atrasado", 
        color: "text-red-500 bg-red-50" 
      };
    }
    
    if (payment.dueDay === currentDay) {
      return { 
        status: "Vence hoje", 
        color: "text-amber-500 bg-amber-50" 
      };
    }
    
    return { 
      status: "Pendente", 
      color: "text-gray-500 bg-gray-50" 
    };
  };
  
  if (payments.length === 0) {
    return (
      <div className="text-center p-8 border-2 border-dashed rounded-lg">
        <CalendarCheck className="w-12 h-12 mx-auto text-muted-foreground" />
        <h3 className="mt-4 text-lg font-medium">Sem pagamentos registrados</h3>
        <p className="mt-2 text-muted-foreground">
          Adicione seus pagamentos mensais e assinaturas para começar a controlar.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Pagamentos de {capitalizedMonth} {currentYear}
        </h3>
        
        <Tabs value={filter} onValueChange={(value: "all" | "pending" | "paid") => setFilter(value)} className="w-auto">
          <TabsList className="grid grid-cols-3 w-[300px]">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="paid">Pagos</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="space-y-3">
        {filteredPayments.map((payment) => {
          const { status, color } = getPaymentStatus(payment);
          const isLate = !payment.isPaid && payment.dueDay < currentDay;
          
          return (
            <div 
              key={payment.id} 
              className={`bg-white border rounded-lg p-4 flex items-center justify-between ${isLate ? 'border-red-300' : 'border-gray-200'}`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">
                    {payment.description}
                    {payment.isInstallment && (
                      <span className="text-sm font-normal text-muted-foreground ml-2">
                        ({payment.currentInstallment}/{payment.totalInstallments})
                      </span>
                    )}
                  </h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${color}`}>
                    {status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm">
                    <span className="text-muted-foreground">Valor:</span> R$ {payment.amount.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </p>
                  
                  <p className="text-sm">
                    <span className="text-muted-foreground">Vencimento:</span> Dia {payment.dueDay}
                  </p>
                  
                  {payment.isRecurring && (
                    <span className="text-xs bg-purple-50 text-budget-purple px-2 py-1 rounded-full">
                      Recorrente
                    </span>
                  )}
                  
                  {payment.cardName && (
                    <div className="flex items-center text-sm gap-1">
                      <CreditCard className="h-3 w-3 text-muted-foreground" />
                      <span>{payment.cardName}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleTogglePaid(payment.id)}
                  className={payment.isPaid 
                    ? "text-gray-500 hover:text-gray-600 border-gray-200" 
                    : "text-green-600 hover:text-green-700 border-green-200 hover:border-green-300 hover:bg-green-50"
                  }
                >
                  <Check className="h-4 w-4 mr-1" />
                  {payment.isPaid ? "Desmarcar" : "Pago"}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeletePayment(payment.id)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 border-gray-200"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
