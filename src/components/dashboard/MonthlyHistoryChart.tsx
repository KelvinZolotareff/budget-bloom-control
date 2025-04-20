
import { useFinance } from "@/contexts/FinanceContext";
import {
  ChartContainer,
  ChartTooltip,
} from "@/components/ui/chart";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function MonthlyHistoryChart() {
  const { transactions } = useFinance();
  
  // Gerar dados dos últimos 6 meses
  const generateMonthlyData = () => {
    const today = new Date();
    const data = [];
    
    for (let i = 5; i >= 0; i--) {
      const month = subMonths(today, i);
      const monthStart = new Date(month.getFullYear(), month.getMonth(), 1);
      const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
      
      // Filtrar transações do mês
      const monthTransactions = transactions.filter(t => {
        const tDate = new Date(t.date);
        return tDate >= monthStart && tDate <= monthEnd;
      });
      
      // Calcular receitas e despesas
      const income = monthTransactions
        .filter(t => t.type === 'receita')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const expense = monthTransactions
        .filter(t => t.type === 'despesa')
        .reduce((sum, t) => sum + t.amount, 0);
        
      const balance = income - expense;
      
      data.push({
        month: format(month, 'MMM', { locale: ptBR }),
        income,
        expense,
        balance
      });
    }
    
    return data;
  };
  
  const data = generateMonthlyData();
  
  const config = {
    colors: {
      income: "#22C55E",
      expense: "#EF4444",
      balance: "#9B87F5"
    }
  };
  
  return (
    <div className="h-full p-6">
      <h3 className="text-xl font-semibold mb-4">Histórico Mensal</h3>
      <div className="h-64">
        <ChartContainer config={config}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis 
                dataKey="month" 
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                dy={10}
              />
              <YAxis 
                tickFormatter={(value) => `R$${value}`}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="income" 
                name="Receitas"
                stroke="#22C55E" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="expense" 
                name="Despesas"
                stroke="#EF4444" 
                strokeWidth={2} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="balance" 
                name="Saldo"
                stroke="#9B87F5" 
                strokeWidth={3} 
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="font-medium">{label}</p>
        <div className="space-y-1 mt-2">
          {payload.map((entry: any, index: number) => (
            <p 
              key={`item-${index}`} 
              style={{ color: entry.color }}
              className="font-semibold"
            >
              {entry.name}: R$ {entry.value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          ))}
        </div>
      </div>
    );
  }
  return null;
};
