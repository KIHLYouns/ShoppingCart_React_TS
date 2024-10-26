import { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ShoppingCart } from "../components/ShoppingCart";

type CartItem = {
	id: number;
	quantity: number;
};

type CartContextType = {
	cart: CartItem[];
	addToCart: (id: number, newQuantity: number) => void;
	removeFromCart: (id: number) => void;
	openCart: () => void;
	closeCart: () => void;
	isOpen: boolean;
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
	const [cart, setCart] = useLocalStorage<CartItem[]>("shopping-cart", []);
	const [isOpen, setIsOpen] = useState(false);

	const openCart = () => setIsOpen(true);
	const closeCart = () => setIsOpen(false);

	const addToCart = (id: number, newQuantity: number) => {
		setCart((prevCart = []) => {
			const existingItem = prevCart.find((item) => item.id === id);
			if (existingItem) {
				return prevCart.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item));
			} else {
				return [...prevCart, { id, quantity: newQuantity }];
			}
		});
	};

	const removeFromCart = (id: number) => {
		setCart((prevCart) => {
			return prevCart.filter((item) => item.id !== id);
		});
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, openCart, closeCart, isOpen }}>
			{children}
			<ShoppingCart isOpen={isOpen} />
		</CartContext.Provider>
	);
};
