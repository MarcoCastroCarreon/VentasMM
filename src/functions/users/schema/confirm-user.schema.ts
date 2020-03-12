import { IsDefined, IsNotEmpty, IsString } from "class-validator";


export class ConfirmUserSchema{
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    token: string;
}