import Item from "../models/Item";
import type {ItemDto} from "../dto/ItemDto";
import axios from "axios";
import {BASE_URL} from "./BASE_URL.ts";

const ITEMS_URL = BASE_URL + "/api/admin/items";



export async function getAllItems(): Promise<Item[]> {
    const res = await axios.get(ITEMS_URL);
    return res.data.map((item: Item) => new Item(
        item.id,
        item.name,
        item.description,
        item.imageUrl,
        item.price
    ));
}

export async function createItem(itemDto: ItemDto): Promise<boolean> {
    const res = await axios.post(ITEMS_URL, itemDto);
    return res.status === 201 || res.status === 200;
}
export async function getItemById(id: number): Promise<Item | null> {
    try {
        const res = await axios.get(`${ITEMS_URL}/${id}`);
        const item = res.data;
        return new Item(
            item.id,
            item.name,
            item.description,
            item.imageUrl,
            item.price
        );
    } catch {
        return null;
    }
}

export async function updateItem(id: number, itemDto: ItemDto): Promise<boolean> {
    const res = await axios.put(`${ITEMS_URL}/${id}`, itemDto);
    return res.status === 200;
}

