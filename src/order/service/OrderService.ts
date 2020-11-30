import OrderDDBRepository from "../infra/OrderDDBRepository";
import OrderRepository from "../domain/OrderRepository";
import Order from "../domain/Order";
import OrderEventPublish from "../domain/OrderEventPublish";
import {OrderSQSEventPublish} from "../infra/OrderSQSEventPublish";
import {v4 as uuid} from 'uuid';
import OrderEventRepository from "../domain/OrderEventRepository";
import OrderEventDDBRepository from "../infra/OrderEventDDBRepository";


export interface IOrderRequest {
    memberId: string;
    productId: string;
    price: number;
}

export interface IOrderEvent {
    eventId: string;
    eventType: string;
    orderId: string;
    event: any;
}


export default class OrderService {

    orderRepository: OrderRepository;
    orderEventPublish: OrderEventPublish;
    orderEventRepository: OrderEventRepository;

    constructor(
        orderDDBRepository = new OrderDDBRepository(),
        orderSQSEventPublish = new OrderSQSEventPublish(),
        orderEventDDBRepository = new OrderEventDDBRepository()
    ) {
        this.orderRepository = orderDDBRepository;
        this.orderEventPublish = orderSQSEventPublish;
        this.orderEventRepository = orderEventDDBRepository;
        console.debug("Construct OrderService");
    }

    placeOrder = async (orderRequest: IOrderRequest) => {
        const order: Order = new Order(orderRequest);
        try {
            await this.orderRepository.save(order);
            await this.orderEventPublish.publish(order, this.orderEventRepository);
            return order;
        } catch (error) {
            return error;
        }
    }
}