
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define interfaces for our data types
interface Transaction {
  id: string;
  description: string;
  amount: number;
  date: string;
  category: string;
  type: 'receita' | 'despesa';
}

interface Investment {
  id: string;
  name: string;
  value: number;
  date: string;
  type: string;
  returnRate?: number;
}

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  createdAt: string;
}

interface Card {
  id: string;
  name: string;
}

interface Payment {
  id: string;
  description: string;
  amount: number;
  dueDay: number;
  isRecurring: boolean;
  isPaid: boolean;
  createdAt: string;
  cardName: string | null;
  isInstallment?: boolean;
  totalInstallments?: number;
  currentInstallment?: number;
}

// Interface for our context
interface FinanceContextType {
  transactions: Transaction[];
  investments: Investment[];
  goals: Goal[];
  cards: Card[];
  payments: Payment[];
  addTransaction: (transaction: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  addInvestment: (investment: Investment) => void;
  deleteInvestment: (id: string) => void;
  updateInvestment: (investment: Investment) => void;
  addGoal: (goal: Goal) => void;
  updateGoal: (goal: Goal) => void;
  deleteGoal: (id: string) => void;
  addCard: (card: Card) => void;
  createNewCardIfNotExists: (cardName: string) => void;
  addPayment: (payment: Payment) => void;
  updatePayment: (payment: Payment) => void;
  deletePayment: (id: string) => void;
  balance: number;
  income: number;
  expenses: number;
  savingsRate: number;
  totalInvestments: number;
}

// Create context with default values
const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

interface FinanceProviderProps {
  children: ReactNode;
}

export const FinanceProvider = ({ children }: FinanceProviderProps) => {
  // Get stored data or use defaults
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });

  const [investments, setInvestments] = useState<Investment[]>(() => {
    const storedInvestments = localStorage.getItem('investments');
    return storedInvestments ? JSON.parse(storedInvestments) : [];
  });
  
  const [goals, setGoals] = useState<Goal[]>(() => {
    const storedGoals = localStorage.getItem('goals');
    return storedGoals ? JSON.parse(storedGoals) : [];
  });
  
  const [cards, setCards] = useState<Card[]>(() => {
    const storedCards = localStorage.getItem('cards');
    return storedCards ? JSON.parse(storedCards) : [];
  });
  
  const [payments, setPayments] = useState<Payment[]>(() => {
    const storedPayments = localStorage.getItem('payments');
    return storedPayments ? JSON.parse(storedPayments) : [];
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('investments', JSON.stringify(investments));
  }, [investments]);
  
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);
  
  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);
  
  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  // Transaction methods
  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => prev.map(t => t.id === transaction.id ? transaction : t));
  };

  // Investment methods
  const addInvestment = (investment: Investment) => {
    setInvestments(prev => [...prev, investment]);
  };

  const deleteInvestment = (id: string) => {
    setInvestments(prev => prev.filter(i => i.id !== id));
  };

  const updateInvestment = (investment: Investment) => {
    setInvestments(prev => prev.map(i => i.id === investment.id ? investment : i));
  };
  
  // Goal methods
  const addGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
  };
  
  const updateGoal = (goal: Goal) => {
    setGoals(prev => prev.map(g => g.id === goal.id ? goal : g));
  };
  
  const deleteGoal = (id: string) => {
    setGoals(prev => prev.filter(g => g.id !== id));
  };
  
  // Card methods
  const addCard = (card: Card) => {
    setCards(prev => [...prev, card]);
  };
  
  const createNewCardIfNotExists = (cardName: string) => {
    const cardExists = cards.some(card => card.name.toLowerCase() === cardName.toLowerCase());
    
    if (!cardExists && cardName.trim() !== "") {
      const newCard = {
        id: Date.now().toString(),
        name: cardName
      };
      
      addCard(newCard);
    }
  };
  
  // Payment methods
  const addPayment = (payment: Payment) => {
    setPayments(prev => [...prev, payment]);
  };
  
  const updatePayment = (payment: Payment) => {
    setPayments(prev => prev.map(p => p.id === payment.id ? payment : p));
  };
  
  const deletePayment = (id: string) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  // Calculate financial metrics
  const income = transactions
    .filter(t => t.type === 'receita')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter(t => t.type === 'despesa')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  const savingsRate = income > 0 ? Math.round((income - expenses) / income * 100) : 0;

  const totalInvestments = investments.reduce((sum, i) => sum + i.value, 0);

  const contextValue: FinanceContextType = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    investments,
    addInvestment,
    deleteInvestment,
    updateInvestment,
    goals,
    addGoal,
    updateGoal,
    deleteGoal,
    cards,
    addCard,
    createNewCardIfNotExists,
    payments,
    addPayment,
    updatePayment,
    deletePayment,
    balance,
    income,
    expenses,
    savingsRate,
    totalInvestments
  };

  return (
    <FinanceContext.Provider value={contextValue}>
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
