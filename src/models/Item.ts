import {IMAGE_URL} from "../services/BASE_URL.ts";

class Item {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
    price: number;

    constructor(id: number, title: string, description: string, imageUrl: string, price: number) {
        this.id = id;
        this.name = title;
        this.description = description;
        this.imageUrl = IMAGE_URL + imageUrl;
        this.price = price;
    }
}

export default Item;