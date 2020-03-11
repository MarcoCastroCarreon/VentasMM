import { BadRequestException } from "../responses/Exception.index";

export const validatorBodyMiddleware=(config?: any)=>{
    return({
        before: async(handler: any, next: any)=>{
            console.log('Iniciando middy ===>');
            //const body = JSON.parse(handler.event.body);
            if(!handler.event.body) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400');
           // if(!body.hasOwnProperty(config['propiedad'])) throw new BadRequestException('VENTAS_MM_COMMON_BAD_REQUEST_400');
            console.log('Finalizando middy ===>');
        },
        onError: (handler: any,next: any)=>{
            console.log('Error middy validator ===>');
            console.log(handler.event.body);
            return handler.callback(handler.error,null);
        }
    })
}