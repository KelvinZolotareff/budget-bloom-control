
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { PaymentsForm } from "@/components/finance/PaymentsForm";
import { PaymentsList } from "@/components/finance/PaymentsList";
import { Card, CardContent } from "@/components/ui/card";

const Pagamentos = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-800">Controle de Pagamentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie seus pagamentos mensais e assinaturas</p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <PaymentsForm />
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card className="border-none shadow-md h-full">
              <CardContent className="p-6">
                <PaymentsList />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pagamentos;
