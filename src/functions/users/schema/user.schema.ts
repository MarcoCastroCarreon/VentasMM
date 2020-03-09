import { IsDefined, IsNotEmpty, IsString, IsDate, IsEnum } from "class-validator";
import { UserTypes } from "../../../commons/enums/types-users.enum";


export class CreateUserSchema {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsDefined()
    @IsNotEmpty()
    @IsEnum(UserTypes,{message: 'Not valid enum value'})
    userType: UserTypes;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsDate()
    creationDate: Date;

}