import { Context, APIGatewayEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from "aws-lambda";
import { CreateUserRequest, CreateUserResponse } from "./interface/user.interface";
import UserServices from "./user.service";

export const handler: APIGatewayProxyHandler = async(event: APIGatewayEvent, context: Context): Promise<APIGatewayProxyResult> => {
context.callbackWaitsForEmptyEventLoop= false;
console.log(`Handler START ---> ${context.functionName}`);

try {
    const requestBody: CreateUserRequest = JSON.parse(event.body);
   // const {password} = requestBody;


    const response: CreateUserResponse = await UserServices.createUser(requestBody);
    console.log(`Handler END ---> ${context.functionName}`);
    return{
        statusCode: 201,
        body: JSON.stringify(response)
    }
} catch (error) {
    console.log(`Handler Error: `,error);
    
}
}