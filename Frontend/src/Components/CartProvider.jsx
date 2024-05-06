import React, { createContext, useContext, useState } from 'react';

// Create a new context for the cart
const CartContext = createContext();

// Custom hook to use the cart context
export const useCart = () => useContext(CartContext);

// CartProvider component to wrap the application and provide the cart context
export const CartProvider = ({ children }) => {
  // State to track the number of items in the cart
  const [cartItemsCount, setCartItemsCount] = useState(0);

  // Function to update the cart items count
  const updateCartItemsCount = (count) => {
    setCartItemsCount(count);
  };

  return (
    <CartContext.Provider value={{ cartItemsCount, updateCartItemsCount }}>
      {children}
    </CartContext.Provider>
  );
};
