import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { LambdaIntegration, LambdaRestApi } from "aws-cdk-lib/aws-apigateway";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import path = require("path");

const LAMBDA_FUNCTION_DIRECTORY = `${__dirname}/lambda/`;

export class TodoApiGatewayStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // define lambda functions from typescript code
    const defaultHandler = new NodejsFunction(this, "DefaultHandlerLambda", {
      runtime: Runtime.NODEJS_16_X,
      entry: path.join(LAMBDA_FUNCTION_DIRECTORY, `DefaultHandler.ts`),
      handler: 'handler'
    });

    const getAllTodosFunction = new NodejsFunction(this, "GetAllTodosLambda", {
        runtime: Runtime.NODEJS_16_X,
        entry: path.join(LAMBDA_FUNCTION_DIRECTORY, `GetAllTodos.ts`),
        handler: 'handler'
    });

    // define the API Gateway
    const getAllTodosApi = new LambdaRestApi(this, 'GetAllTodosApiGW', {
        handler: defaultHandler,
        proxy: false
    });

    const todos = getAllTodosApi.root.addResource("todo");

    const allTodos = todos.addResource('all');
    const getAllTodosIntegration = new LambdaIntegration(getAllTodosFunction);
    allTodos.addMethod('GET', getAllTodosIntegration);  // GET /todo/all
  }
}
