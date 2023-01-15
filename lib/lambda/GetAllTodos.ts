import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { pgClient } from "../../utils/PostgresClient";
import { Client } from "ts-postgres";

/**
 * handles logic for the endpoint: GET /todo/all
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log("Received event: ", event);

    await pgClient.connect();

    try {
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
    } catch (e: unknown) {
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    } finally {
        await pgClient.end();
    }
};
