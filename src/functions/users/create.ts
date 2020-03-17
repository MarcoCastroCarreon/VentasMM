const middy = require('middy');
import { Context, APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { CreateUserRequest, CreateUserResponse } from "./interface/user.interface";
import UserServices from "./user.service";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";
import { handlerException } from "../../commons/responses/Exception.index";
import ResponseCode from "../../commons/responses/Response.index";
import { schemaValidatorMiddleware } from "../../commons/middlewares/schemaValidator.middleware";
import { CreateUserSchema } from "./schema/user.schema";

/**
 * @api {post} /admin/users Create a new user of type ADMIN
 * @apiName createUserAdmin 
 * @apiGroup users
 * 
 * @apiResquestExample
 * {
 *   "email": string,
 *   "password": string,
 *   "userType": string,
 *   "status": string,
 *   "creationDate": Date,
 *   "name": string,
 *   "lastName": string,
 *   "country": number,
 *   "phone": string,
 *   "address": string,
 *   "token": string
 * }
 * 
 * @apiSuccessExample {json}  Success Response:
 * HTTP/ 201 Created
 * {
 *  "id": 0,
 *  "email": string,
 *  "userType": string
 * }
 */
const originalHandler: APIGatewayProxyHandler = async (event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(`Handler START ---> ${context.functionName}`);

    try {
        const requestBody: CreateUserRequest = JSON.parse(event.body)
        const response: CreateUserResponse = await UserServices.createUser(requestBody);
        console.log(`Handler END ---> ${context.functionName}`);
        return ResponseCode.Created(response);
    } catch (error) {
        console.log(`Handler Error: `, error);
        return handlerException(error);
    }
}
export const handler = middy(originalHandler)
    .use(createDbConnection())
    .use(schemaValidatorMiddleware({ schema: CreateUserSchema }))