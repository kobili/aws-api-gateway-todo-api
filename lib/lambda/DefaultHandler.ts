import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";

/**
 * handles logic for the endpoint: GET /todo/all
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log("Received event: ", event);

    return {
        statusCode: 200,
        body: "Welcome to the API!"
    };
};