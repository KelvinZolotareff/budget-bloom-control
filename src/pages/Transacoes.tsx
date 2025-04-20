
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { TransactionForm } from "@/components/finance/TransactionForm";

const Transacoes = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transações</h1>
          <p className="text-muted-foreground mt-1">Gerencie suas receitas e despesas</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <TransactionForm />
          </div>
          <div className="md:col-span-2">
            <TransactionList />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Transacoes;
