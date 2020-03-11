import { IsDefined, IsNotEmpty, IsString} from "class-validator";


export class CreateUserSchema {
    
    @IsDefined()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsDefined()
    @IsNotEmpty()
    @IsString()
    password: string;
}