const middy = require('middy');
import { APIGatewayProxyHandler, APIGatewayProxyEvent, Context, APIGatewayProxyResult } from "aws-lambda";
import UserServices from "./user.service";
import ResponseCode from "../../commons/responses/Response.index";
import { BadRequestException, handlerException } from "../../commons/responses/Exception.index";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";

/**
 * 
 * @api {delete} /users/{userId} Delete user
 * @apiName deleteUser
 * @apiGroup users
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/ 204 Not Content
 * 
 */

const originalHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(`Handler START --> ${context.functionName}`);
    const { userId } = event.pathParameters;
    const id = +userId;
    console.log(id);

    if (!userId) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400', { error: `${userId} required` })
    if (Number.isInteger(id) == false) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400', { error: `${userId} it's not a number` })

    try {
        await UserServices.deleteUser(id);
        console.log(`Handler END --> ${context.functionName}`);
        return ResponseCode.NoContent();
    } catch (error) {
        console.log(`Handler Error: `, error);
        return handlerException(error);

    }

}
export const handler = middy(originalHandler)
    .use(createDbConnection())