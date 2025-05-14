import axios from "axios";
import CartItem from "../models/CartItem.ts";
import {BASE_URL} from "./BASE_URL.ts";

const CART_URL = BASE_URL + "/api/cart";

export async function addToCart(itemId: number, quantity: number): Promise<boolean> {
    const res = await axios.post(CART_URL, {
        itemId,
        quantity
    });
    return res.status === 201 || res.status === 200;
}

export async function getCartItems(): Promise<CartItem[]> {
    const res = await axios.get(CART_URL);
    return res.data.cartItems.map((cartItem: CartItem) => new CartItem(
        cartItem.id,
        cartItem.item,
        cartItem.quantity
    ));
}

export async function removeFromCart(itemId: number): Promise<boolean> {
    const res = await axios.delete(CART_URL + "/" + itemId);
    return res.status === 200;
}

export async function clearCart(): Promise<boolean> {
    const res = await axios.delete(CART_URL);
    return res.status === 200 || res.status === 204;
}