import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product } from '../_mock/_products';

export interface CartItem {
  product: Product;
  variantId: string;
  colorName: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, variantId: string, colorName: string, quantity?: number) => void;
  removeFromCart: (productId: string, variantId: string, colorName: string) => void;
  updateQuantity: (productId: string, variantId: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
  isInCart: (productId: string, variantId: string, colorName: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (product: Product, variantId: string, colorName: string, quantity: number = 1) => {
      setItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.variantId === variantId &&
            item.colorName === colorName
        );

        if (existingItemIndex > -1) {
          const newItems = [...prevItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
          return newItems;
        }

        return [...prevItems, { product, variantId, colorName, quantity }];
      });
    },
    []
  );

  const removeFromCart = useCallback(
    (productId: string, variantId: string, colorName: string) => {
      setItems((prevItems) =>
        prevItems.filter(
          (item) =>
            !(
              item.product.id === productId &&
              item.variantId === variantId &&
              item.colorName === colorName
            )
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, variantId: string, colorName: string, quantity: number) => {
      setItems((prevItems) => {
        const itemIndex = prevItems.findIndex(
          (item) =>
            item.product.id === productId &&
            item.variantId === variantId &&
            item.colorName === colorName
        );

        if (itemIndex > -1) {
          const newItems = [...prevItems];
          newItems[itemIndex] = { ...newItems[itemIndex], quantity };
          return newItems;
        }

        return prevItems;
      });
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(
    () =>
      items.reduce((total, item) => {
        const variant = item.product.variants.find((v) => v.id === item.variantId);
        const price = variant?.price || item.product.price;
        return total + price * item.quantity;
      }, 0),
    [items]
  );

  const getCartCount = useCallback(
    () => items.reduce((count, item) => count + item.quantity, 0),
    [items]
  );

  const isInCart = useCallback(
    (productId: string, variantId: string, colorName: string) =>
      items.some(
        (item) =>
          item.product.id === productId &&
          item.variantId === variantId &&
          item.colorName === colorName
      ),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      isInCart,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount, isInCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

