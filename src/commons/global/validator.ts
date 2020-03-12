import { ClassType, transformAndValidate } from "class-transformer-validator";
import { BadRequestException } from "../responses/Exception.index";
import { ValidatorErrorInterfaceObject } from "./interfaces/validator.error.interface";


export async function schemaValidator(
  schema: ClassType<any>,
  json: string
): Promise<void | Error> {
  try {
    await transformAndValidate(schema, JSON.parse(json));
  } catch (error) {
    throw new BadRequestException("VENTAS_MM_COMMON_BAD_REQUEST_400", {
      error: await errorParser(error)
    });
  }
}

export async function errorParser(dataArray: Array<ValidatorErrorInterfaceObject>) {
  let errorPack: string[] = [];
  console.log('Error Array ===>>',dataArray);
  for (let data of dataArray) {
    console.log(data);
      if (data.children && data.children.length) errorParser(data.children);
      else errorPack.push(`Property ${data.property} rejected by ${Object.values(data.constraints)[0]}.`);
  }
  console.log('Error Pack: ', errorPack);
  return errorPack;
}
