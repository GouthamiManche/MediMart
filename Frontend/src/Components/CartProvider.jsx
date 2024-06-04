// CartProvider.jsx
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from 'react-toastify';
import { AuthContext } from "./AuthProvider";

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
  const { user } = useContext(AuthContext);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchCartItems = async () => {
    if (user && user.email) {
      try {
        const response = await fetch(`${apiUrl}/getcartitems?email=${user.email}`);
        const data = await response.json();
        dispatch({ type: "SET_CART_ITEMS", payload: data });
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
        toast.error("Failed to fetch cart items");
      }
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [user, apiUrl]);

  const setCartItems = (updatedCartItems) => {
    dispatch({ type: "SET_CART_ITEMS", payload: updatedCartItems });
  };

  return (
    <CartContext.Provider value={{ state, setCartItems, fetchCartItems }}>
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
