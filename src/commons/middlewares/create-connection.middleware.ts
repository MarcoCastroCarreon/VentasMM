import { initConnection } from "../connection";
import { getConnection } from "typeorm";
import { handlerException } from "../responses/Exception.index";


export const createDbConnection = (config?: any) => {
    return ({
        before: async (handler: any, next: any) => {
            console.log('Midd: START ==> createDbConnection');
            await initConnection();
            console.log('Midd: END ==> createDbConnection');
        },
        after: async (handler: any, next: any) => {
            await getConnection().close();
        },
        onError: (handler: any, next: any) => {
            console.log('Error middy validator ===>');
            const e = handlerException(handler.error);
            console.log(e);
            return handler.callback(e, null);
        }
    })
}