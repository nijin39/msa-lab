import Order from "./Order";

export default interface OrderRepository {
    save(order:Order);
}