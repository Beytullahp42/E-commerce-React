import CartItem from "../models/CartItem.ts";
import {removeFromCart} from "../services/CartService.ts";
import {toast} from "react-toastify";

interface CartItemTileProps {
    cartItem: CartItem;
    fetchCartItems: () => void;
}

function CartItemTile({cartItem, fetchCartItems}: CartItemTileProps) {
    const handleDelete = async () => {

        await toast.promise(
            removeFromCart(cartItem.id),
            {
                pending: "Removing from cart...",
                success: "Removed from cart!",
                error: "Error removing from cart",
            });
        fetchCartItems();
    };
    return (
        <div className="cart-item-tile flex items-center gap-4 p-4 border rounded shadow w-full">
            <img src={cartItem.item.imageUrl} alt={cartItem.item.name} className="w-16 h-16 object-cover"/>
            <div className="flex flex-row">
                <div className={"me-4"}>
                    <h3 className="text-lg font-semibold">{cartItem.item.name}</h3>
                    <p className="text-gray-800 font-bold">${cartItem.item.price * cartItem.quantity}</p>
                    <p className="text-gray-600">Quantity: {cartItem.quantity}</p>
                </div>
                <div className={"content-end"}>
                    <button
                        className={"bg-red-500 text-white font-semibold px-4 py-2 rounded"}
                        onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItemTile;