import { Response } from 'lambda-proxy-utils';
import { HttpStatusCode } from "../enums/http-status.enum";


export default class ResponseCode {

    static Ok(data: any, headers?: any) {
        return this.parse(HttpStatusCode.OK, data, headers);
    }

    static Created(data: any, headers?: any) {
        return this.parse(HttpStatusCode.CREATED, data, headers);
    }

    static NoContent() {
        return this.parse(HttpStatusCode.NOT_CONTENT);
    }

    static parse(statusCode: HttpStatusCode, data?: any, headers?: any) {
        data = data ? data : {};
        headers = headers ? headers : {}
        headers = {
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Expose-Headers': 'X-Total-Count, Authorization',
            ...headers
        }
        return new Response({ statusCode, cors: true, headers }).send(JSON.stringify(data));
    }

}