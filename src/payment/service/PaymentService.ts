import {IOrderEvent} from "../controller/PaymentController";
import PaymentEvent from "../domain/PaymentEvent";
import PaymentEventRepository from "../domain/PaymentEventRepository";
import PaymentEventDDBRepository from "../infra/PaymentEventDDBRepository";
import PaymentCounter from "../domain/PaymentCounter";

export default class PaymentService {
    paymentEventRepository:PaymentEventRepository;
    paymentCounter:PaymentCounter;

    constructor(
        paymentEventDDBrepository = new PaymentEventDDBRepository(),
        paymentCount = new PaymentCounter()) {
        this.paymentEventRepository = paymentEventDDBrepository;
        this.paymentCounter = paymentCount;
    }

    async applyEvent(orderEvent: IOrderEvent) {
        const paymentEvent:PaymentEvent = new PaymentEvent(orderEvent);
        await this.paymentEventRepository.save(paymentEvent)
        await this.paymentCounter.increasePaymentCount();
        console.log("Apply Event");
        return Promise.resolve(undefined);
    }
}