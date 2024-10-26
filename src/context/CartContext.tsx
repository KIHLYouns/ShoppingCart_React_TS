import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
	id: number;
	quantity: number;
};

type CartContextType = {
	cart: CartItem[];
	addToCart: (id: number) => void;
	removeFromCart: (id: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
	const [cart, setCart] = useState<CartItem[]>([]);

	const addToCart = (id: number) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === id);
			if (existingItem) {
				return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
			} else {
				return [...prevCart, { id, quantity: 1 }];
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === id);
			if (existingItem && existingItem.quantity > 1) {
				return prevCart.map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
			} else {
				return prevCart.filter((item) => item.id !== id);
			}
		});
	};

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};
