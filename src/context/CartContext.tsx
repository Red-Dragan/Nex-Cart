import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  useEffect,
} from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}
type CartAction =
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "INCREMENT"; payload: CartItem }
  | { type: "Decrement"; payload: CartItem }
  | { type: "REMOVE"; payload: CartItem };

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  handleIncriment: (item: CartItem) => void;
  handleDecrement: (item: CartItem) => void;
  handleRemoveItem: (item: CartItem) => void;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  if (action.type === "ADD_TO_CART") {
    const existingItem = state.items.find(
      (item) => item.id === action.payload.id
    );

    if (existingItem) {
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        ),
      };
    } else {
      return {
        items: [...state.items, action.payload],
      };
    }
  }
  if (action.type === "INCREMENT") {
    return {
      items: state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    };
  }
  if (action.type === "Decrement") {
    return {
      items: state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      ),
    };
  }
  if (action.type === "REMOVE") {
    return {
      items: state.items.filter((item) => item.id !== action.payload.id),
    };
  }
  return state;
};

const loadCartFromStorage = () => {
  try {
    const saveCart = localStorage.getItem("cart");
    if (saveCart) return JSON.parse(saveCart);
  } catch (error) {
    console.log("Error Loading cart from local storage:", error);
  }
  return {items: []};
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [] },
    loadCartFromStorage
  );

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(state));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [state]);

  const addToCart = (item: Omit<CartItem, "quantity">, quantity = 1) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...item, quantity },
    });
  };
  const handleIncriment = (item: CartItem) => {
    dispatch({
      type: "INCREMENT",
      payload: { ...item },
    });
  };
  const handleDecrement = (item: CartItem) => {
    dispatch({
      type: "Decrement",
      payload: { ...item },
    });
  };

  const handleRemoveItem = (item: CartItem) => {
    dispatch({
      type: "REMOVE",
      payload: { ...item },
    });
  };
  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addToCart,
        handleIncriment,
        handleDecrement,
        handleRemoveItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be with CartProvider");
  return context;
};
