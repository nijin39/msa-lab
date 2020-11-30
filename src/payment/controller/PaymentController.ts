import PaymentService from "../service/PaymentService";

export interface IOrderEventContext {
    orderId: string;
    memberId: string;
    productId: string;
    price: number;
}

export interface IOrderEvent {
    eventId: string;
    eventType: string;
    event: IOrderEventContext;
}

export default class OrderController {

    paymentService: PaymentService;

    constructor(paymentService = new PaymentService()) {
        this.paymentService = paymentService;
    }

    applyEvent = async (event) => {
        const orderEvent: IOrderEvent = JSON.parse(event);
        return await this.paymentService.applyEvent(orderEvent);
    }

}