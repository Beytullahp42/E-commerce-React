import Item from "../models/Item";
import {Link} from "react-router-dom";

interface AdminItemTileProps {
    item: Item,
}

function AdminItemTile({item}: AdminItemTileProps) {

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
                    <Link to={"/admin/edit/" + item.id}>
                        <button
                            className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600"
                        >
                            Edit
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );

}

export default AdminItemTile;
