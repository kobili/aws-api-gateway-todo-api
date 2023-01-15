import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path = require("path");
import { Duration } from 'aws-cdk-lib';

const LAMBDA_FUNCTION_DIRECTORY = `${__dirname}/lambda/`;
const LAMBDA_TIMEOUT_DURATION = Duration.seconds(30);

export class TodoApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define lambda functions from typescript code
    const defaultHandler = new NodejsFunction(this, "DefaultHandlerLambda", {
      runtime: Runtime.NODEJS_16_X,
      entry: path.join(LAMBDA_FUNCTION_DIRECTORY, `DefaultHandler.ts`),
      handler: 'handler',
      timeout: LAMBDA_TIMEOUT_DURATION
    });

    const getAllTodosFunction = new NodejsFunction(this, "GetAllTodosLambda", {
        runtime: Runtime.NODEJS_16_X,
        entry: path.join(LAMBDA_FUNCTION_DIRECTORY, `GetAllTodos.ts`),
        handler: 'handler',
        timeout: LAMBDA_TIMEOUT_DURATION
    });

    const addNewTodoFunction = new NodejsFunction(this, "AddTodoLambda", {
      runtime: Runtime.NODEJS_16_X,
      entry: path.join(LAMBDA_FUNCTION_DIRECTORY, "AddNewTodo.ts"),
      handler: 'handler',
      timeout: LAMBDA_TIMEOUT_DURATION
    });

    // define the API Gateway
    const getAllTodosApi = new LambdaRestApi(this, 'GetAllTodosApiGW', {
        handler: defaultHandler,
        proxy: false
    });

    const todos = getAllTodosApi.root.addResource("todo");
    const addTodoIntegration = new LambdaIntegration(addNewTodoFunction);
    todos.addMethod('POST', addTodoIntegration);  // POST /todo/

    const allTodos = todos.addResource('all');
    const getAllTodosIntegration = new LambdaIntegration(getAllTodosFunction);
    allTodos.addMethod('GET', getAllTodosIntegration);  // GET /todo/all
  }
}
