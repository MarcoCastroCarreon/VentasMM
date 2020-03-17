const middy = require('middy');
import { APIGatewayProxyHandler, APIGatewayProxyResult, APIGatewayProxyEvent, Context } from "aws-lambda";
import { createDbConnection } from "../../commons/middlewares/create-connection.middleware";
import UserServices from "./user.service";
import { BadRequestException, handlerException } from "../../commons/responses/Exception.index";
import ResponseCode from "../../commons/responses/Response.index";


/**
 * 
 * @api {get} /admins Get the information of all users type ADMIN
 * @apiName listUsersAdmin
 * @apiGroup users
 * 
 * @apiSuccessExample {json} Success-Response:
 * HTTP/ 200 OK
 * }
 *  "id": 0,
    "name": string,
    "email": string,
    "phone": string,
    "address": string
 * }
 * 
 */

const originalHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(`Handler START ---> ${context.functionName}`);

    const { page, per_page } = event.queryStringParameters;
    console.log(`PAGE AND PER PAGE: ${page}, ${per_page}`);
    if (!page || !per_page) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400', { error: `page and perpage and required` })
    if (+page == 0 || +per_page == 0) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400', { error: `page and perpage cannot be 0` })
    if (isNaN(+page) && isNaN(+per_page)) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400', { error: `page and perpage and required` })
    try {
        const [response, count] = await UserServices.listUsersAdmin(+page, +per_page);
        console.log(`Handler END ---> ${context.functionName}`);
        return ResponseCode.Ok(response, { 'X-Total-Count': count });
    } catch (error) {
        console.log(`Handler Error: `, error);
        return handlerException(error);
    }
}
export const handler = middy(originalHandler)
    .use(createDbConnection())