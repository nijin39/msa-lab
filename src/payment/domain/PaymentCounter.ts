import * as AWS from "aws-sdk";

AWS.config.update({ region: "ap-northeast-2" });
let docClient = new AWS.DynamoDB.DocumentClient({
    apiVersion: "2012-08-10"
});


export default class PaymentCounter {

    constructor() {
        console.debug("Construct PaymentCounter");
    }

    isEmpty = (value) => (
        value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
    )

    getPaymentCount = async ():Promise<number> => {
        const params = {
            TableName: process.env.PaymentTable!,
            Key: {
                "PK": 'PaymentCounter'
            }
        };

        const counter = await docClient.get(params).promise();
        console.log("COUNTER Staus :", counter, this.isEmpty(counter));
        if( this.isEmpty(counter) ) {
            await docClient.put({
                TableName: process.env.PaymentTable!,
                Item: {
                    "PK": 'PaymentCounter',
                    "paymentCounter": 0,
                },
                ReturnValues: "ALL_OLD"
            }).promise()
            return 0;
        }

        return counter.Item?.paymentCounter;
    };

    increasePaymentCount = async ():Promise<number> => {

        const params = {
            TableName: process.env.PaymentTable!,
            Key: {
                "PK": 'PaymentCounter'
            },
            UpdateExpression: "set paymentCounter = paymentCounter + :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        };
        console.log("Param increase :", params);
        try {
            const updateCounter = await docClient.update(params).promise()
            return updateCounter.Attributes?.paymentCounter;
        } catch(err) {
            console.log("ERR :", err);
            throw new Error("ㅠㅠ");
        }
    }
}