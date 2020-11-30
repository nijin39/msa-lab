import PaymentEvent from "./PaymentEvent";

export default interface PaymentEventRepository {
    save(paymentEvent:PaymentEvent);
}