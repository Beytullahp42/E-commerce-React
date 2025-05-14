import Cart from "./Cart.ts";

class Order {
    id: number;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    address: string;
    cart: Cart;
    totalPrice: number;
    orderStatus: string;

    constructor(id: number, name: string, surname: string, email: string, phoneNumber: string, address: string, cart: Cart, totalPrice: number, orderStatus: string) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.cart = new Cart(
            cart.id,
            cart.cartItems,
            cart.isCompleted
        );
        this.totalPrice = totalPrice;
        this.orderStatus = orderStatus;
    }
}

export default Order;