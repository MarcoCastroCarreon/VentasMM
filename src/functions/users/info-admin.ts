const middy = require('middy');
import { APIGatewayProxyHandler, Context, APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { InfoAdminResponse } from '../users/interface/user.interface'
import UserServices from "./user.service";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";
import { handlerException, BadRequestException } from "../../commons/responses/Exception.index";
import ResponseCode from "../../commons/responses/Response.index";

const originalHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>=>{
    context.callbackWaitsForEmptyEventLoop=false;
    console.log(`HANDLER START ---> ${context.functionName}`);

    const {userId} = event.pathParameters;
    if (!userId) throw new BadRequestException ('VENTAS_MM_COMMON_BAD_REQUEST_400',{error: `${userId} required`})
    try {
        const response: InfoAdminResponse = await UserServices.InfoAdmin(+userId);
        console.log(`HANDLER END ---> ${context.functionName}`);
        return ResponseCode.Ok(response);
    } catch (error) {
        console.log(`Handler Error: `,error);
        return handlerException(error);
    }
}
    export const handler = middy(originalHandler)
    .use(createDbConnection())