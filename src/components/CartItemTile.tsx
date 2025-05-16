import CartItem from "../models/CartItem.ts";
import { removeFromCart } from "../services/CartService.ts";
import { toast } from "react-toastify";
import { BsTrash3Fill } from "react-icons/bs";

interface CartItemTileProps {
    cartItem: CartItem;
    fetchCartItems: () => void;
}

function CartItemTile({ cartItem, fetchCartItems }: CartItemTileProps) {
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
        <div className="cart-item-tile flex gap-3 p-3 border rounded-lg shadow-sm w-full h-36 bg-white">
            <div className="w-24 h-24 flex-shrink-0">
                <img
                    src={cartItem.item.imageUrl}
                    alt={cartItem.item.name}
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="flex-1 flex flex-col justify-between min-w-0 h-full">
                <h3 className="text-base font-medium leading-tight line-clamp-2">
                    {cartItem.item.name}
                </h3>

                <div className="flex items-end justify-between mt-auto">
                    <div className="flex flex-col leading-snug">
                        <p className="text-gray-800 font-semibold text-sm">
                            ${(cartItem.item.price * cartItem.quantity).toFixed(2)}
                        </p>
                        <p className="text-gray-600 text-xs">
                            {cartItem.quantity} × ${cartItem.item.price.toFixed(2)}
                        </p>
                    </div>

                    <button
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full h-8 w-8 flex items-center justify-center"
                        onClick={handleDelete}
                        aria-label="Remove item"
                    >
                        <BsTrash3Fill className="text-sm" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItemTile;
