import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class CreateUserExampleSchema {
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsDefined()
  @IsNotEmpty()
  @IsString()
  password: string;
}
