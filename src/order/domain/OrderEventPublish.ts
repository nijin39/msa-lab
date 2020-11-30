import Order from "./Order";
import OrderEventRepository from "./OrderEventRepository";

export default interface OrderEventPublish {
    publish(order:Order, orderEventRepository:OrderEventRepository);
}