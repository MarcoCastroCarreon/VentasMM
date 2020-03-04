import { initConnection } from "../connection";
import { getConnection } from "typeorm";
import { handlerException } from "../responses/Exception.index";


export const createDbConnection = () => {
    return ({
        before: async () => {
            console.log('Midd: START ==> createDbConnection');
            await initConnection();
            console.log('Midd: END ==> createDbConnection');
        },
        after: async () => {
            await getConnection().close();
        },
        onError: (handler: any) => {
            const e = handlerException(handler.error);
            return handler.callback(null, e);
        }
    })
}