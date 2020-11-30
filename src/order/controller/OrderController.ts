import OrderService from "../service/OrderService";

export interface OrderRequest {
    memberId: string;
    productId: string;
    price: number;
}

export default class OrderController {

    orderService: OrderService;

    constructor(orderService = new OrderService()) {
        this.orderService = orderService;
    }

    placeOrder = async (event) => {
        const orderRequest: OrderRequest = JSON.parse(event.body);
        return await this.orderService.placeOrder(orderRequest);
    }

}