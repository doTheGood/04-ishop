import { createContext, ReactNode, useState } from 'react';

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: string;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface ICartContextData {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  checkIfItemAlreadyExists: (productId: string) => boolean;
  removeCartItem: (productId: string) => void;
  cartTotalPrice: number;
}

interface ICartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as ICartContextData);

export function CartContextProvider({ children }: ICartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const cartTotalPrice = cartItems.reduce((total, product) => {
    return total + product.numberPrice;
  }, 0);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product]);
  }

  function checkIfItemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId);
  }

  function removeCartItem(productId: string) {
    setCartItems((state) => state.filter((item) => item.id !== productId));
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        checkIfItemAlreadyExists,
        removeCartItem,
        cartTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
