import OrderController from "./controller/OrderController";

let orderController = new OrderController();

exports.lambdaHandler = async (event, context) => {
    if (event.path === "/order" && event.httpMethod === "POST") {
        try {
            const order = await orderController.placeOrder(event);
            return {
                statusCode: 200,
                body: JSON.stringify(order)
            };
        } catch (err) {
            return {
                statusCode: 500,
                body: JSON.stringify(err)
            };
        }

    }
}