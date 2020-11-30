import Hello from "./controller/Hello";

let response;
let hello = new Hello();

exports.lambdaHandler = async (event, context) => {
    try {
        hello.insertTODDB(event);
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
