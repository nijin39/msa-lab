import {IOrderEvent} from "../controller/PaymentController";

export interface IOrderEventContext {
    orderId: string;
    memberId: string;
    productId: string;
    price: number;
}

export default class PaymentEvent {
    eventId: string;
    eventType: string;
    event: IOrderEventContext;

    constructor(orderEvent:IOrderEvent) {
        this.eventId = orderEvent.eventId;
        this.eventType = orderEvent.eventType;
        this.event = orderEvent.event as IOrderEventContext;
    }
}