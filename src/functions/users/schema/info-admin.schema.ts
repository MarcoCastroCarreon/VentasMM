import { IsDefined, IsNotEmpty, IsNumber } from "class-validator";

export class InfoAdminSchema {
  @IsDefined()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

}