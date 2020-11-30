import OrderEventPublish from "../domain/OrderEventPublish";
import Order from "../domain/Order";
import {v4 as uuid} from 'uuid';
import OrderEventRepository from "../domain/OrderEventRepository";

let AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-2" });
let sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const ORDERQUEUEURL = process.env.OrderQueue;

export class OrderSQSEventPublish implements OrderEventPublish {

  async publish(order: Order, orderEventRepository:OrderEventRepository) {
    const eventId = uuid();
    const params = {
      DelaySeconds: 0,
      MessageAttributes: {
        Title: {
          DataType: "String",
          StringValue: "Demo for MZ",
        },
        Author: {
          DataType: "String",
          StringValue: "Kim Jong IL",
        },
      },
      MessageBody: JSON.stringify({
        "eventId": eventId,
        "eventType": "PLACEORDER",
        "event": JSON.stringify({
          "orderId":order.orderId,
          "memberId":order.memberId,
          "productId":order.productId,
          "price":order.price
        })
      }),
      QueueUrl: ORDERQUEUEURL,
    };

    try {
      const result = await sqs.sendMessage(params).promise() ;
      const saveResult = await orderEventRepository.save({
        "eventId" : eventId,
        "eventType": "PLACEORDER",
        "event": JSON.stringify({
          "orderId":order.orderId,
          "memberId":order.memberId,
          "productId":order.productId,
          "price":order.price}
        )
      })
      console.log(result, saveResult);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
