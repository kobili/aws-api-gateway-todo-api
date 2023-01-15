#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { TodoApiGatewayStack } from '../lib/TodoApiGatewayStack';

const app = new cdk.App();
new TodoApiGatewayStack(app, "TodoApiGatewayStack");