import { ClassType, transformAndValidate } from "class-transformer-validator";
import { BadRequestException } from "../responses/Exception.index";

export async function schemaValidator(
  schema: ClassType<any>,
  json: string
): Promise<void | Error> {
  try {
    await transformAndValidate(schema, JSON.parse(json));
  } catch (error) {
    console.log(error);
    throw new BadRequestException("VENTAS_MM_COMMON_BAD_REQUEST_400", {
      error: parseError(error)
    });
  }
}

export async function parseError(data): Promise<string[]> {
  return data;
}
