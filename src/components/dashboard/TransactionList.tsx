
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
  Briefcase 
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: "expense" | "income";
}

const transactions: Transaction[] = [
  {
    id: "t1",
    date: "Apr 19, 2025",
    description: "Grocery Shopping",
    category: "Food",
    amount: 156.89,
    type: "expense"
  },
  {
    id: "t2",
    date: "Apr 18, 2025",
    description: "Salary Deposit",
    category: "Income",
    amount: 4175.00,
    type: "income"
  },
  {
    id: "t3",
    date: "Apr 17, 2025",
    description: "Rent Payment",
    category: "Housing",
    amount: 1800.00,
    type: "expense"
  },
  {
    id: "t4", 
    date: "Apr 16, 2025",
    description: "Gas Station",
    category: "Transportation",
    amount: 45.75,
    type: "expense"
  },
  {
    id: "t5",
    date: "Apr 15, 2025",
    description: "Coffee Shop",
    category: "Food",
    amount: 12.50,
    type: "expense"
  }
];

const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Food":
      return <ShoppingCart className="h-4 w-4 text-green-500" />;
    case "Housing":
      return <Home className="h-4 w-4 text-blue-500" />;
    case "Transportation":
      return <Car className="h-4 w-4 text-amber-500" />;
    case "Income":
      return <Briefcase className="h-4 w-4 text-budget-purple" />;
    default:
      return <Coffee className="h-4 w-4 text-gray-500" />;
  }
};

export function TransactionList() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <a href="/transactions" className="text-sm text-budget-purple hover:underline">View All</a>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="text-sm text-muted-foreground">
                  {transaction.date}
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(transaction.category)}
                    <span>{transaction.category}</span>
                  </div>
                </TableCell>
                <TableCell className={`text-right font-medium ${
                  transaction.type === 'income' ? 'text-green-600' : ''
                }`}>
                  {transaction.type === 'income' ? '+' : '-'}
                  ${transaction.amount.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: 2 
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
