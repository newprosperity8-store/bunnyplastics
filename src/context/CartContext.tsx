import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
  id: string; // product id + color
  productId: string;
  name: string;
  color: string;
  size?: string;
  qty: number | string;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number | string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartCount = items.reduce((total, item) => {
    if (typeof item.qty === 'number') return total + item.qty;
    return total + 1; // if it's a range/string, just count as 1 item
  }, 0);

  const addToCart = (newItem: Omit<CartItem, 'id'>) => {
    setItems(currentItems => {
      const id = `${newItem.productId}-${newItem.color}${newItem.size ? `-${newItem.size}` : ''}`;
      const existingItem = currentItems.find(item => item.id === id);

      if (existingItem) {
        return currentItems.map(item => {
          if (item.id === id) {
            let newQty = item.qty;
            if (typeof item.qty === 'number' && typeof newItem.qty === 'number') {
              newQty = item.qty + newItem.qty;
            } else {
              newQty = newItem.qty; // Just override if string
            }
            return { ...item, qty: newQty };
          }
          return item;
        });
      }

      return [...currentItems, { ...newItem, id }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number | string) => {
    setItems(currentItems => 
      currentItems.map(item => {
        if (item.id === id) {
           return { ...item, qty: typeof qty === 'number' ? Math.max(1, qty) : qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      cartCount, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
