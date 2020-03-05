const middy = require("middy");
import {
  APIGatewayProxyHandler,
  APIGatewayProxyEvent,
  Context,
  APIGatewayProxyResult
} from "aws-lambda";
import { handlerException } from "../../commons/responses/Exception.index";
import { schemaValidatorMiddleware } from "../../commons/middlewares/schemaValidator.middleware";
import { CreateUserExampleSchema } from "./schema/example.schema";

const originalHandler: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> => {
  console.info(`Handler: START ===> ${context.functionName}`);
  try {
    console.info(JSON.parse(event.body));
  } catch (error) {
    return handlerException(error);
  }
};

export const handler = middy(originalHandler).use(
  schemaValidatorMiddleware({ schema: CreateUserExampleSchema })
);
