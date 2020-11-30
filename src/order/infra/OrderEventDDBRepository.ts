import * as AWS from "aws-sdk";
import Order from "../domain/Order";
import OrderRepository from "../domain/OrderRepository";
import OrderEventRepository from "../domain/OrderEventRepository";
import OrderEvent from "../domain/OrderEvent";

AWS.config.update({ region: "ap-northeast-2" });
let docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});


export default class OrderEventDDBRepository implements OrderEventRepository{

    constructor() {
        console.debug("Construct OrderDDBRepository");
    }

    async save(orderEvent: OrderEvent) {
        let params = {
            TableName: process.env.OrderTable!,
            Item: {
                "PK": orderEvent.eventId,
                "type": "EVENT",
                "eventType": orderEvent.eventType,
                "event": orderEvent.event            },
            ReturnValues: "ALL_OLD"

        };

        return await docClient.put(params).promise();
    }
}