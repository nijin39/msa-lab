import * as AWS from "aws-sdk";
import PaymentEventRepository from "../domain/PaymentEventRepository";
import PaymentEvent from "../domain/PaymentEvent";


AWS.config.update({ region: "ap-northeast-2" });
let docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});


export default class PaymentEventDDBRepository implements PaymentEventRepository{

    constructor() {
        console.debug("Construct OrderDDBRepository");
    }

    async save(paymentEvent:PaymentEvent) {
        let params = {
            TableName: process.env.PaymentTable!,
            Item: {
                "PK": paymentEvent.eventId,
                "eventType": paymentEvent.eventType,
                "event": paymentEvent.event
            },
            ReturnValues: "ALL_OLD"

        };
        console.log("PEDR save :", paymentEvent, params);
        const result = await docClient.put(params).promise();
        return result;
    }
}