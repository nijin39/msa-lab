import * as AWS from "aws-sdk";
import Order from "../domain/Order";
import OrderRepository from "../domain/OrderRepository";

AWS.config.update({ region: "ap-northeast-2" });
let docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});


export default class OrderDDBRepository implements OrderRepository{

    constructor() {
        console.debug("Construct OrderDDBRepository");
    }

    async save(order: Order) {
        let params = {
            TableName: process.env.OrderTable!,
            Item: {
                "PK": order.orderId,
                "type": "order",
                "memberId": order.memberId,
                "productId": order.productId,
                "price": order.price
            },
            ReturnValues: "ALL_OLD"

        };

        return await docClient.put(params).promise();
    }
}