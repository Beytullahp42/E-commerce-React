import React, { useState } from "react";
import { createItem } from "../services/ItemService.ts";
import { toast } from "react-toastify";

import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import type { FilePondFile } from "filepond";
import { BASE_URL } from "../services/BASE_URL.ts";
import {useNavigate} from "react-router";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function CreateItem() {
    const navigate = useNavigate();
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [price, setPrice] = useState(0);
    const [, setFiles] = useState<FilePondFile[]>([]);
    const url = BASE_URL + "/api/upload";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!imageUrl){
            toast.error("Please upload an image.");
            return;
        }
        const itemDto = {
            name: itemName,
            description: description,
            imageUrl: imageUrl,
            price: price,
        };
        await toast.promise(createItem(itemDto), {
            pending: "Creating item...",
            success: "Item created successfully!",
            error: "Error creating item",
        });
        navigate("/admin");

    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-center">Create New Item</h1>

            <div className="mb-6">
                <FilePond
                    onupdatefiles={setFiles}
                    allowMultiple={false}
                    maxFiles={1}
                    name="file"
                    acceptedFileTypes={["image/*"]}
                    labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                    server={{
                        url: url,
                        process: {
                            url: "",
                            method: "POST",
                            onload: (response) => {
                                const res = JSON.parse(response);
                                setImageUrl(res.imageUrl);
                                return res.filename;
                            },
                        },
                        revert: {
                            url: `/${imageUrl}`,
                            method: "DELETE",
                            onload: (response) => {
                                return response;
                            },
                        },
                    }}
                />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                    <input
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min={1}
                        step="1"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 font-semibold transition duration-200"
                >
                    Create Item
                </button>
            </form>
        </div>
    );
}

export default CreateItem;
