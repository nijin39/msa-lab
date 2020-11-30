import {v4 as uuid} from 'uuid';

export default class Order {

    orderId: string;
    memberId: string;
    productId: string;
    price: number;

    constructor(orderRequest) {
        this.orderId = uuid();
        this.memberId = orderRequest.memberId;
        this.productId = orderRequest.productId;
        this.price = orderRequest.price;
        console.log("Order :",orderRequest.memberId, orderRequest.productId);
    }

    validateOrder = ():boolean => {
        return true;
    }

}