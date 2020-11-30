import OrderEvent from "./OrderEvent";

export default interface OrderEventRepository {
    save(orderEvent: OrderEvent);
}