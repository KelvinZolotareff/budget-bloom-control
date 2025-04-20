
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ShoppingCart, 
  Home, 
  Car, 
  Coffee, 
  Briefcase,
  Trash2,
  FileText,
  HeartPulse,
  BookOpen,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useFinance } from "@/contexts/FinanceContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Alimentação":
      return <ShoppingCart className="h-4 w-4 text-green-500" />;
    case "Moradia":
      return <Home className="h-4 w-4 text-blue-500" />;
    case "Transporte":
      return <Car className="h-4 w-4 text-amber-500" />;
    case "Salário":
    case "Freelance":
    case "Renda":
      return <Briefcase className="h-4 w-4 text-budget-purple" />;
    case "Saúde":
      return <HeartPulse className="h-4 w-4 text-red-500" />;
    case "Educação":
      return <BookOpen className="h-4 w-4 text-indigo-500" />;
    case "Investimentos":
      return <DollarSign className="h-4 w-4 text-green-600" />;
    default:
      return <FileText className="h-4 w-4 text-gray-500" />;
  }
};

export function TransactionList({ limit }: { limit?: number }) {
  const { transactions, deleteTransaction } = useFinance();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  
  const filteredTransactions = transactions.filter(
    (transaction) => 
      transaction.description.toLowerCase().includes(search.toLowerCase()) ||
      transaction.category.toLowerCase().includes(search.toLowerCase())
  );
  
  const displayedTransactions = limit 
    ? filteredTransactions.slice(0, limit) 
    : filteredTransactions;

  const handleDelete = (id: string) => {
    deleteTransaction(id);
    toast({
      title: "Sucesso",
      description: "Transação excluída com sucesso"
    });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Transações Recentes</CardTitle>
        {!limit && (
          <Input
            placeholder="Pesquisar transações..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        )}
        {limit && (
          <Link to="/transacoes" className="text-sm text-budget-purple hover:underline">
            Ver Todas
          </Link>
        )}
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Valor</TableHead>
              {!limit && <TableHead className="w-[100px]">Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayedTransactions.length > 0 ? (
              displayedTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(parseISO(transaction.date), "dd/MM/yyyy", { locale: ptBR })}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(transaction.category)}
                      <span>{transaction.category}</span>
                    </div>
                  </TableCell>
                  <TableCell className={`text-right font-medium ${
                    transaction.type === 'receita' ? 'text-green-600' : ''
                  }`}>
                    {transaction.type === 'receita' ? '+' : '-'}
                    R$ {transaction.amount.toLocaleString('pt-BR', { 
                      minimumFractionDigits: 2, 
                      maximumFractionDigits: 2 
                    })}
                  </TableCell>
                  {!limit && (
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDelete(transaction.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                        <span className="sr-only">Excluir</span>
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={limit ? 4 : 5} className="h-24 text-center">
                  Nenhuma transação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
