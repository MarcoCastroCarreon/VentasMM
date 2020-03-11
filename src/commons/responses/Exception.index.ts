import _ from "lodash";
import { Response } from "lambda-proxy-utils";
import templateCodes from "../../../resources/template-codes.json";
import { HttpStatusCode } from "../enums/http-status.enum";

export class VentasMMException extends Error {
  public statusCode: number;
  public code: string;
  public message: string = null;
  public mergeVaribles: any;

  constructor() {
    super();
  }
}

export class BadRequestException extends VentasMMException {
  constructor(code: string, mergeVariables?: any) {
    super();
    this.name = "BadRequestError";
    this.statusCode = HttpStatusCode.BAD_REQUEST;
    this.code = code;
    this.mergeVaribles = mergeVariables;
  }
}

export class NotFoundException extends VentasMMException {
  constructor(code: string, mergeVariables?: any) {
      super();
      this.name = 'NotFoundError'
      this.statusCode = HttpStatusCode.NOT_FOUND;
      this.code = code;
      this.mergeVaribles = mergeVariables;   
  }
}

export class ConflictException extends VentasMMException {
  constructor(code: string, mergeVariables?: any) {
    super();
    this.name = 'ConflictError';
    this.statusCode = HttpStatusCode.CONFLICT;
    this.code = code;
    this.mergeVaribles =  mergeVariables;
  }
}

export class InternalServerErrorException extends VentasMMException {
  constructor(code: string, mergeVariables?: any) {
    super();
    this.name = 'InternalServerError';
    this.statusCode = HttpStatusCode.INTERNAL_SERVER;
    this.code = code;
    this.mergeVaribles =  mergeVariables;
  }
}

export const handlerException = (ventasMmException: VentasMMException) => {
 console.log('handler exception -->');
 
  const { statusCode, code, mergeVaribles } = ventasMmException;
  delete ventasMmException.statusCode;
  delete ventasMmException.mergeVaribles;

  const compiled = _.template(templateCodes[code]);

  ventasMmException.message = mergeVaribles
    ? compiled(mergeVaribles)
    : compiled();

  return new Response({ statusCode, cors: true }).send(
    JSON.stringify(ventasMmException)
  );
};
