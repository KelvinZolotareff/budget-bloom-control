
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useFinance } from "@/contexts/FinanceContext";

export function ExpenseChart() {
  const { transactions } = useFinance();
  
  // Filtra apenas despesas
  const expenses = transactions.filter(t => t.type === 'despesa');
  
  // Agrupa por categoria
  const expensesByCategory = expenses.reduce((acc, expense) => {
    const existingCategory = acc.find(item => item.category === expense.category);
    if (existingCategory) {
      existingCategory.amount += expense.amount;
    } else {
      acc.push({
        category: expense.category,
        amount: expense.amount
      });
    }
    return acc;
  }, [] as { category: string; amount: number }[]);
  
  // Ordena do maior para o menor
  expensesByCategory.sort((a, b) => b.amount - a.amount);
  
  // Prepara dados para o gráfico
  const totalExpenses = expensesByCategory.reduce((sum, item) => sum + item.amount, 0);
  const chartData = expensesByCategory.map(item => ({
    name: item.category,
    value: item.amount,
    percentage: totalExpenses > 0 ? ((item.amount / totalExpenses) * 100).toFixed(1) : '0'
  }));
  
  // Cores para o gráfico
  const COLORS = [
    '#9B87F5', // Budget Purple
    '#38BDF8', // Sky Blue
    '#FB923C', // Orange
    '#6366F1', // Indigo
    '#22C55E', // Green
    '#EF4444', // Red
    '#A855F7', // Purple
    '#FACC15', // Yellow
  ];
  
  // Fix: Changed from object with theme to proper ChartConfig type
  const config = {
    colors: {
      light: "#9B87F5", // Budget Purple
      dark: "#7E69AB", // Secondary Purple
    }
  };
  
  return (
    <div className="h-full p-6">
      <h3 className="text-xl font-semibold mb-4">Despesas por Categoria</h3>
      <div className="h-64">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <ChartTooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      
      <div className="mt-4">
        <ChartLegend>
          <ChartLegendContent />
        </ChartLegend>
        
        <div className="mt-4 space-y-1">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span>{item.name}</span>
              </div>
              <div className="font-medium">
                R$ {item.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} ({item.percentage}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium">{payload[0].name}</p>
        <p className="text-budget-purple font-bold">
          R$ {payload[0].value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <p className="text-sm text-gray-500">{payload[0].payload.percentage}% do total</p>
      </div>
    );
  }
  return null;
};
