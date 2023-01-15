import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { pgClient } from "../../utils/PostgresClient";

/**
 * handles logic for the endpoint: GET /todo/all
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log("Received event: ", event);

    await pgClient.connect();

    const dbQueryResult = pgClient.query(
        "SELECT * FROM todo"
    );

    let data = [];

    for await (const result of dbQueryResult) {
        data.push(result);
    }

    return {
        statusCode: 200,
        body: JSON.stringify(data)
    };
};
