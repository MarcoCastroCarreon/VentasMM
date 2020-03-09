import { CreateUserRequest, CreateUserResponse } from "./interface/user.interface";
import { User } from "../../persistence/entitites/user.entity";
import UserDAO from "./user.dao";

export default class UserServices{

    static async createUser(data: CreateUserRequest): Promise<CreateUserResponse>{
        try {
            const {email,password,userType,status, creationDate}= data;
            const user = new User;
            user.email = email;
            user.password = password;
            user.userType = userType;
            user.status = status;
            user.creationDate= creationDate;

            await UserDAO.saveUser(user);
            return{
                id: user.id,
                email: user.email, 
                userType: user.userType
            }
        } catch (error) {
            console.log(error);
        }
    }
}