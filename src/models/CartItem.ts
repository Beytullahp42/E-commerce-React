import Item from "./Item.ts";

class CartItem{
    id: number;
    item: Item;
    quantity: number;

    constructor(id: number, item: Item, quantity: number) {
        this.id = id;
        this.item = new Item(
            item.id,
            item.name,
            item.description,
            item.imageUrl,
            item.price
        );
        this.quantity = quantity;
    }
}

export default CartItem;