import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product } from '../_mock/_products';

interface CompareContextType {
  items: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  toggleCompare: (product: Product) => void;
  clearCompare: () => void;
  maxItems: number;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const addToCompare = useCallback((product: Product) => {
    setItems((prevItems) => {
      if (prevItems.some((item) => item.id === product.id)) {
        return prevItems;
      }
      if (prevItems.length >= MAX_COMPARE_ITEMS) {
        return prevItems;
      }
      return [...prevItems, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  }, []);

  const isInCompare = useCallback(
    (productId: string) => items.some((item) => item.id === productId),
    [items]
  );

  const toggleCompare = useCallback(
    (product: Product) => {
      if (isInCompare(product.id)) {
        removeFromCompare(product.id);
      } else {
        addToCompare(product);
      }
    },
    [isInCompare, removeFromCompare, addToCompare]
  );

  const clearCompare = useCallback(() => {
    setItems([]);
  }, []);

  const value = useMemo(
    () => ({
      items,
      addToCompare,
      removeFromCompare,
      isInCompare,
      toggleCompare,
      clearCompare,
      maxItems: MAX_COMPARE_ITEMS,
    }),
    [items, addToCompare, removeFromCompare, isInCompare, toggleCompare, clearCompare]
  );

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

