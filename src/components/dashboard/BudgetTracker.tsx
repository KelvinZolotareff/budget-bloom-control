
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface BudgetItemProps {
  category: string;
  spent: number;
  budgeted: number;
  color: string;
}

function BudgetItem({ category, spent, budgeted, color }: BudgetItemProps) {
  const percentage = (spent / budgeted) * 100;
  
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{category}</span>
        <span className="text-sm">
          ${spent.toLocaleString()} / ${budgeted.toLocaleString()}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Progress 
          value={percentage} 
          className={`h-2 ${percentage > 100 ? 'bg-red-200' : ''} [&>div]:${percentage > 100 ? 'bg-red-500' : color}`}
        />
        <span className="text-xs w-12 text-right">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}

export function BudgetTracker() {
  const budgetItems = [
    { category: "Housing", spent: 1800, budgeted: 1900, color: "bg-budget-purple" },
    { category: "Food", spent: 850, budgeted: 800, color: "bg-budget-purple-dark" },
    { category: "Transportation", spent: 450, budgeted: 500, color: "bg-budget-blue" },
    { category: "Entertainment", spent: 380, budgeted: 300, color: "bg-budget-blue-light" },
    { category: "Others", spent: 760, budgeted: 600, color: "bg-budget-gray" },
  ];

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
      </CardHeader>
      <CardContent>
        {budgetItems.map((item) => (
          <BudgetItem
            key={item.category}
            category={item.category}
            spent={item.spent}
            budgeted={item.budgeted}
            color={item.color}
          />
        ))}
      </CardContent>
    </Card>
  );
}
