import { createContext, useContext, useState, ReactNode } from "react";

type CartItem = {
	id: number;
	quantity: number;
};

type CartContextType = {
	cart: CartItem[];
	addToCart: (id: number, newQuantity: number) => void;
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

	const addToCart = (id: number, newQuantity: number) => {
		console.log("Before update:", cart);

		setCart((prevCart = []) => {
			const existingItem = prevCart.find((item) => item.id === id);
			if (existingItem) {
				return prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
			} else {
				return [...prevCart, { id, quantity: newQuantity }];
			}
		});
		console.log("After update:", cart);
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => {
			return prevCart.filter((item) => item.id !== id);
		});
	};

	return <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>{children}</CartContext.Provider>;
};
