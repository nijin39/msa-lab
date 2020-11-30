
export default class OrderEvent {
    eventId : string;
    eventType: string;
    event: string;

    constructor(eventId: string, eventType:string, event: string) {
        this.eventId = eventId;
        this.eventType = eventType;
        this.event = event;
    }
}