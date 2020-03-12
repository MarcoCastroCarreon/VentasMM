const middy = require('middy');
import { APIGatewayProxyHandler, Context, APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { InfoAdminResponse } from '../users/interface/user.interface'
import UserServices from "./user.service";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";
import { handlerException } from "../../commons/responses/Exception.index";

const originalHandler: APIGatewayProxyHandler = async(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>=>{
    context.callbackWaitsForEmptyEventLoop=false;
    console.log(`HANDLER START ---> ${context.functionName}`);

    try {
        const {userId} = event.pathParameters;
        console.log(userId);
        const response: InfoAdminResponse = await UserServices.InfoAdmin(+userId);
        return{
            statusCode: 201,
            body: JSON.stringify(response)
        }
    } catch (error) {
        console.log(`Handler Error: `,error);
        return handlerException(error);
    }
}
    export const handler = middy(originalHandler)
    .use(createDbConnection())