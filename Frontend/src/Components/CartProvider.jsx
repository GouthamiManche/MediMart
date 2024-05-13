import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART_ITEMS":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

const initialState = {
  cartItems: [],
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const setCartItems = (updatedCartItems) => {
    dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
  };

  return (
    <CartContext.Provider value={{ state, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
