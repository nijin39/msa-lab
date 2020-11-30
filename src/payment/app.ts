import {v4 as uuid} from "uuid";

let response;
import PaymentController from "./controller/PaymentController";
let AWS = require("aws-sdk");
AWS.config.update({ region: "ap-northeast-2" });
let sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
const ORDERQUEUEURL = process.env.OrderQueue;

let paymentController = new PaymentController();

exports.lambdaHandler = async (event, context) => {
    try {
        // const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                // location: ret.data.trim()
            })
        }
    } catch (err) {
        console.log(err);
        return err;
    }

    return response
};

async function deleteMessage(message){
    const params = {
        QueueUrl: ORDERQUEUEURL,
        ReceiptHandle: message
    };

    sqs.deleteMessage(params, function(err, data) {
        if(err) {
            return Promise.reject(err);
        }
        else {
            return Promise.resolve(data)
        }
    });
}

export async function eventHandler(event, context) {
    console.log(event);
    try {
        for (const record of event.Records) {
            const {body} = record;
            await paymentController.applyEvent(body);
            await deleteMessage(record.receiptHandle);
        }
        context.succeed("Finish")
    } catch (error) {
        context.succeed(error);
    }
}