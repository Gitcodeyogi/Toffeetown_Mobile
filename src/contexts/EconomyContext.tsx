import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type TransactionType = 'grant' | 'purchase';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  date: string;
  description: string;
}

interface EconomyState {
  coins: number;
  transactions: Transaction[];
  unlockedStories: string[];
  hasReceivedInitialGrant: boolean;
}

interface EconomyContextType extends EconomyState {
  grantInitialCoins: () => void;
  purchaseStory: (storyId: string, title: string) => boolean;
  addCoins: (amount: number) => void;
}

const defaultState: EconomyState = {
  coins: 0,
  transactions: [],
  unlockedStories: [],
  hasReceivedInitialGrant: false,
};

const EconomyContext = createContext<EconomyContextType | undefined>(undefined);

export function EconomyProvider({ children }: { children: ReactNode }) {
  // Load from localStorage if available
  const [state, setState] = useState<EconomyState>(() => {
    const saved = localStorage.getItem('toffeetowns_economy');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse economy state:', e);
      }
    }
    return defaultState;
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem('toffeetowns_economy', JSON.stringify(state));
  }, [state]);

  const grantInitialCoins = () => {
    if (state.hasReceivedInitialGrant) return;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'grant',
      amount: 200,
      date: new Date().toISOString(),
      description: 'Welcome Grant for registering as a Hero!',
    };

    setState((prev) => ({
      ...prev,
      coins: prev.coins + 200,
      transactions: [newTransaction, ...prev.transactions],
      hasReceivedInitialGrant: true,
    }));
  };

  const purchaseStory = (storyId: string, title: string): boolean => {
    if (state.unlockedStories.includes(storyId)) return true;
    if (state.coins < 50) return false;

    const newTransaction: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'purchase',
      amount: -50,
      date: new Date().toISOString(),
      description: `Unlocked story: ${title}`,
    };

    setState((prev) => ({
      ...prev,
      coins: prev.coins - 50,
      transactions: [newTransaction, ...prev.transactions],
      unlockedStories: [...prev.unlockedStories, storyId],
    }));

    return true;
  };

  const addCoins = (amount: number) => {
    setState((prev) => ({
      ...prev,
      coins: prev.coins + amount,
    }));
  };

  return (
    <EconomyContext.Provider value={{ ...state, grantInitialCoins, purchaseStory, addCoins }}>
      {children}
    </EconomyContext.Provider>
  );
}

export function useEconomy() {
  const context = useContext(EconomyContext);
  if (context === undefined) {
    throw new Error('useEconomy must be used within an EconomyProvider');
  }
  return context;
}
