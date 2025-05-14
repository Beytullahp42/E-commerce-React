import axios from "axios";
import {BASE_URL} from "./BASE_URL.ts";
import type {OrderDto} from "../dto/OrderDto.ts";
import Order from "../models/Order.ts";

const ORDER_URL = BASE_URL + "/api/order";

export async function createOrder(orderDto: OrderDto): Promise<boolean> {
    const res = await axios.post(ORDER_URL, orderDto);
    return res.status === 201 || res.status === 200;
}

export async function getOrders(): Promise<Order[]> {
    const res = await axios.get(ORDER_URL);

    return res.data.map((order: Order) => {
        return new Order(
            order.id,
            order.name,
            order.surname,
            order.email,
            order.phoneNumber,
            order.address,
            order.cart,
            order.totalPrice,
            order.orderStatus
        );
    });
}

export async function getOrderById(id: number): Promise<Order | null> {
    try {
        const res = await axios.get(ORDER_URL + "/" + id);
        const order = res.data;

        return new Order(
            order.id,
            order.name,
            order.surname,
            order.email,
            order.phoneNumber,
            order.address,
            order.cart,
            order.totalPrice,
            order.orderStatus
        );
    } catch {
        return null;
    }
}

export async function updateOrderStatus(id: number, status: string) {
    const res = await axios.put(ORDER_URL + "/" + id + "/status", { orderStatus: status });
    return res.status === 200;
}