import Item from "../models/Item";
import {useState} from "react";
import {toast} from "react-toastify";
import {addToCart} from "../services/CartService.ts";

interface ItemTileProps {
    item: Item,
    fetchCartItems: () => Promise<void>
}

function ItemTile({item, fetchCartItems}: ItemTileProps) {
    const [quantity, setQuantity] = useState<number>(1);

    const handlePlus = () => setQuantity((prev) => prev + 1);
    const handleMinus = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddToCart = async () => {
        await toast.promise(addToCart(item.id, quantity), {
            pending: "Adding to cart...",
            success: "Added to cart!",
            error: "Error adding to cart",
        });
        await fetchCartItems();
    };

    return (
        <div
            className="item-tile w-96 h-[400px] border-2 border-gray-300 rounded-xl p-4 shadow-md flex flex-col bg-white"
        >
            <img
                className="w-64 h-64 object-cover border rounded self-center"
                src={item.imageUrl}
                alt={item.name}
            />
            <div className="flex flex-row justify-between items-center mt-4">
                <div className="w-2/3 pr-2">
                    <h2 className="text-xl font-semibold truncate">{item.name}</h2>
                    <p className="text-gray-600 line-clamp-2 text-sm">{item.description}</p>
                    <p className="text-lg font-bold text-green-700 mt-1">Price: ${item.price}</p>
                </div>
                <div className="w-1/3 pl-2 flex flex-col justify-between">
                    <div className="flex bg-amber-100 items-center justify-between gap-2 mb-2">
                        <button
                            onClick={handleMinus}
                            className="bg-amber-500 text-white font-bold w-10 h-10 text-xl rounded hover:bg-amber-600"
                        >
                            -
                        </button>
                        <span className="text-xl font-medium w-6 text-center">{quantity}</span>
                        <button
                            onClick={handlePlus}
                            className="bg-amber-500 text-white font-bold w-10 h-10 text-xl rounded hover:bg-amber-600"
                        >
                            +
                        </button>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className="w-full bg-amber-500 text-white font-semibold py-2 rounded hover:bg-amber-600"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );

}

export default ItemTile;
