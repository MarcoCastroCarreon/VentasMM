import { Context } from "aws-lambda";
import { schemaValidator } from "../global/validator";
import { handlerException } from "../responses/Exception.index";

export const schemaValidatorMiddleware: Function = (config: any) => {
  return {
    before: async (handler: any) => {
      console.info("START ==> schemaValidator");
      const context: Context = handler.context;
      context.callbackWaitsForEmptyEventLoop = false;
      console.log("Body: ==>", JSON.parse(handler.event.body));
      await schemaValidator(config.schema, handler.event.body);
      console.info("END ==> schemaValidator");
    },
    onError: (handler: any) => {
      console.log('Error middy validator ===>');
      console.log(handler.error);
      const e = handlerException(handler.error);
      return handler.callback(null, e);
    }
  };
};
