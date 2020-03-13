const middy = require('middy');
import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import { UserConfirmation } from "./interface/user.interface";
import UserServices from "./user.service";
import { BadRequestException, handlerException } from "../../commons/responses/Exception.index";
import ResponseCode from "../../commons/responses/Response.index";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";
import { ConfirmUserSchema } from "./schema/confirm-user.schema";
import { schemaValidatorMiddleware } from "../../commons/middlewares/schemaValidator.middleware";

/**
 * 
 * @api {put} /users/{userId} Update the status of user
 * @apiName confirmUser
 * @apiGroup users
 * 
 * @apiRequestExample 
 * 
 * {
 *   "token": string
 * }
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/ 204 Not Content
 * 
 */

const originalHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    
    const request: UserConfirmation = JSON.parse(event.body);   
    const {userId} = event.pathParameters;
    if (!userId) throw new BadRequestException ('VENTAS_MM_COMMON_BAD_REQUEST_400',{error: `${userId} required`})    
    try {
        await UserServices.confirmUser(+userId,request.token);
        return ResponseCode.NoContent();
    } catch (error) {
        console.log(`Handler Error: `,error);
        return handlerException(error);
    }
}

export const handler = middy(originalHandler)
    .use(createDbConnection())
    .use(schemaValidatorMiddleware({schema: ConfirmUserSchema}))