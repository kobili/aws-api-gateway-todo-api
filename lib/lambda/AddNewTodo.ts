import { APIGatewayEvent, APIGatewayProxyHandler, Context } from "aws-lambda";
import { pgClient } from "../../utils/PostgresClient";

/**
 * handles logic for the endpoint: POST /todo/
 */
export const handler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context) => {
    console.log("Received event: ", event);

    const requestBody = JSON.parse(event.body!);
    const newTodo = requestBody["todo"];

    await pgClient.connect();

    try {
        const insertStatement = await pgClient.query(
            "INSERT INTO todo (id, completed, todo) VALUES (NEXTVAL('todo_seq'), $1, $2) RETURNING id, todo;",
            [false, newTodo]
        );
    
        return {
            statusCode: 200,
            body: JSON.stringify({
                insertStatement
            })
        };
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify(e)
        }
    } finally {
        await pgClient.end();
    }
    
};
