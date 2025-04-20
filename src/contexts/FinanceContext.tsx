
import React, { createContext, useContext, useState, useEffect } from 'react';

export type TransactionType = 'receita' | 'despesa';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amount: number;
  type: TransactionType;
}

export interface Investment {
  id: string;
  name: string;
  type: string;
  value: number;
  initialDate: string;
  currentValue?: number;
  growth?: number;
}

interface FinanceContextType {
  transactions: Transaction[];
  investments: Investment[];
  balance: number;
  income: number;
  expenses: number;
  savingsRate: number;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  addInvestment: (investment: Omit<Investment, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  deleteInvestment: (id: string) => void;
  updateInvestmentValue: (id: string, newValue: number) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2025-04-19",
    description: "Compras no Supermercado",
    category: "Alimentação",
    amount: 156.89,
    type: "despesa"
  },
  {
    id: "t2",
    date: "2025-04-18",
    description: "Salário",
    category: "Renda",
    amount: 4175.00,
    type: "receita"
  },
  {
    id: "t3",
    date: "2025-04-17",
    description: "Aluguel",
    category: "Moradia",
    amount: 1800.00,
    type: "despesa"
  },
  {
    id: "t4", 
    date: "2025-04-16",
    description: "Posto de Gasolina",
    category: "Transporte",
    amount: 145.75,
    type: "despesa"
  },
  {
    id: "t5",
    date: "2025-04-15",
    description: "Cafeteria",
    category: "Alimentação",
    amount: 12.50,
    type: "despesa"
  }
];

const mockInvestments: Investment[] = [
  {
    id: "i1",
    name: "Tesouro Direto",
    type: "Renda Fixa",
    value: 5000,
    initialDate: "2025-01-10",
    currentValue: 5250,
    growth: 5
  },
  {
    id: "i2",
    name: "Ações PETR4",
    type: "Renda Variável",
    value: 3000,
    initialDate: "2025-02-15",
    currentValue: 3240,
    growth: 8
  },
  {
    id: "i3",
    name: "CDB Banco XYZ",
    type: "Renda Fixa",
    value: 10000,
    initialDate: "2025-03-20",
    currentValue: 10300,
    growth: 3
  }
];

export const FinanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : mockTransactions;
  });
  
  const [investments, setInvestments] = useState<Investment[]>(() => {
    const saved = localStorage.getItem('investments');
    return saved ? JSON.parse(saved) : mockInvestments;
  });

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);

  const balance = transactions.reduce((acc, transaction) => {
    return transaction.type === 'receita' 
      ? acc + transaction.amount 
      : acc - transaction.amount;
  }, 0);

  const income = transactions
    .filter(t => t.type === 'receita')
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'despesa')
    .reduce((acc, t) => acc + t.amount, 0);

  const savingsRate = income > 0 ? ((income - expenses) / income) * 100 : 0;

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: `t${Date.now()}`
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  const addInvestment = (investment: Omit<Investment, 'id'>) => {
    const newInvestment = {
      ...investment,
      id: `i${Date.now()}`
    };
    setInvestments(prev => [newInvestment, ...prev]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const deleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(i => i.id !== id));
  };

  const updateInvestmentValue = (id: string, newValue: number) => {
    setInvestments(prev => prev.map(inv => {
      if (inv.id === id) {
        const growth = ((newValue - inv.value) / inv.value) * 100;
        return { ...inv, currentValue: newValue, growth };
      }
      return inv;
    }));
  };

  const value = {
    transactions,
    investments,
    balance,
    income,
    expenses,
    savingsRate,
    addTransaction,
    addInvestment,
    deleteTransaction,
    deleteInvestment,
    updateInvestmentValue
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance deve ser usado dentro de um FinanceProvider');
  }
  return context;
};
