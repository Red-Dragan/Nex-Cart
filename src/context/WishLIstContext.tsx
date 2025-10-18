import React, {
  useReducer,
  createContext,
  useContext,
  type ReactNode,
  useEffect,
} from "react";

interface wishlistItem {
  id: number;
  price: number;
  title: string;
  quantity: number
  thumbnail: string;
}
interface wishlistState {
  items: wishlistItem[];
}

interface WishlistContext {
  items: wishlistItem[];
  addToWish: (item: wishlistItem) => void;
  removeFromWishlist: (item: number) => void;
  isInWishlist: (item: number) => boolean;
}
type WishAction =
  | { type: "ADD_TO_WISH"; payload: wishlistItem }
  | { type: "REMOVE"; payload: number };

const WishlistContext = createContext<WishlistContext | undefined>(undefined);

const wishlistReducer = (
  state: wishlistState,
  action: WishAction
): wishlistState => {
  if (action.type === "ADD_TO_WISH") {
    const exists = state.items.find((item) => item.id === action.payload.id);
    if (!exists) {
      return { items: [...state.items, action.payload] };
    }
  }
  if (action.type === "REMOVE")
    return { items: state.items.filter((item) => item.id !== action.payload) };

  return state;
};

const loadWishlistFromStorage = () => {
  try {
    const saveWishlist = localStorage.getItem("wishlist");
    if (saveWishlist) return JSON.parse(saveWishlist);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load wishlist: ${message}`);
  }
  return {items: []};
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(
    wishlistReducer,
    { items: [] },
    loadWishlistFromStorage
  );
  const isInWishlist = (itemId: number): boolean => {
  return state.items.some(item => item.id === itemId);
};

  const addToWish = (item: wishlistItem) => {
    dispatch({ type: "ADD_TO_WISH", payload: item });
  };
  const removeFromWishlist = (item: number) => {
    dispatch({ type: "REMOVE", payload: item });
  };
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(state));
    } catch (error) {
      const errorMesage =
        error instanceof Error ? error.message : String(error);
      throw new Error(`Error saving cart to localStorage: ${errorMesage}`);
    }
  }, [state]);
  return (
    <WishlistContext.Provider
      value={{ items: state.items, addToWish, removeFromWishlist, isInWishlist}}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};
