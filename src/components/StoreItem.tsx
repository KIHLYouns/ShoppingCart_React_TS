import { useCart } from "../context/CartContext";
import { Card, Button, Badge } from "react-bootstrap";
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { formattedPrice } from "../utilities/formattedPrice";

type StoreItemProps = {
	id: number;
	name: string;
	price: number;
	imgUrl: string;
};

const StoreItem = ({ id, name, price, imgUrl }: StoreItemProps) => {
	const { cart, addToCart, removeFromCart } = useCart();
	const cartItem = cart.find((item) => item.id === id);
	const quantity = cartItem ? cartItem.quantity : 0;

	const handlePlus = () => {
		const newQuantity = quantity + 1;
		addToCart(id, newQuantity);
	};

	const handleMinus = () => {
		if (quantity > 0) {
			const newQuantity = quantity - 1;
			addToCart(id, newQuantity);
			if (newQuantity === 0) {
				removeFromCart(id);
			}
		}
	};

	const handleRemoveFromCart = () => {
		removeFromCart(id);
	};

	return (
		<Card
			className="mb-3"
			style={{ transition: "transform 0.2s", cursor: "pointer" }}
			onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
			onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
		>
			<Card.Img src={imgUrl} height="200px" variant="top" style={{ objectFit: "cover" }} />
			<Card.Body className="d-flex flex-column">
				<div className="d-flex justify-content-between align-items-center mb-3">
					<Card.Title className="mb-0">{name}</Card.Title>
					<Card.Text className="text-muted mb-0">{formattedPrice(price)}</Card.Text>
				</div>
				{quantity === 0 ? (
					<Button variant="primary" onClick={handlePlus}>
						<FaShoppingCart /> Add to Cart
					</Button>
				) : (
					<>
						<div className="d-flex justify-content-center align-items-center">
							<Button variant="danger" onClick={handleMinus}>
								<FaMinus />
							</Button>
							<span className="mx-2">
								<Badge bg="secondary">{quantity}</Badge>
							</span>
							<Button variant="danger" onClick={handlePlus}>
								<FaPlus />
							</Button>
						</div>
						<div className="mt-2 d-flex justify-content-center">
							<Button variant="danger" onClick={handleRemoveFromCart}>
								Remove from Cart
							</Button>
						</div>
					</>
				)}
			</Card.Body>
		</Card>
	);
};

export default StoreItem;
