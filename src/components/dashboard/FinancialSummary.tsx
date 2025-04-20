
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, DollarSign } from "lucide-react";

interface SummaryCardProps {
  title: string;
  amount: number;
  change: number;
  icon: React.ReactNode;
}

function SummaryCard({ title, amount, change, icon }: SummaryCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="p-2 bg-budget-purple-light rounded-md">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toLocaleString()}</div>
        <div className={`flex items-center text-xs ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}>
          {isPositive ? (
            <ArrowUpIcon className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDownIcon className="h-4 w-4 mr-1" />
          )}
          {Math.abs(change)}% from last month
        </div>
      </CardContent>
    </Card>
  );
}

export function FinancialSummary() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <SummaryCard 
        title="Total Balance"
        amount={24580}
        change={12}
        icon={<DollarSign className="text-budget-purple h-4 w-4" />}
      />
      <SummaryCard 
        title="Monthly Income"
        amount={8350}
        change={3.2}
        icon={<ArrowUpIcon className="text-green-500 h-4 w-4" />}
      />
      <SummaryCard 
        title="Monthly Expenses"
        amount={5240}
        change={-2.5}
        icon={<ArrowDownIcon className="text-red-500 h-4 w-4" />}
      />
      <SummaryCard 
        title="Savings Rate"
        amount={3110}
        change={8.4}
        icon={<PiggyBank className="text-budget-blue h-4 w-4" />}
      />
    </div>
  );
}

const PiggyBank = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 5c-1.5 0-2.8 1.4-3 2-3.5-1.5-11-.3-11 5 0 1.8 0 3 2 4.5V20h4v-2h3v2h4v-4c1-.5 1.7-1 2-2h2v-4h-2c0-1-.5-1.5-1-2V5z" />
      <path d="M2 9v1c0 1.1.9 2 2 2h1" />
      <path d="M16 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
    </svg>
  );
};
