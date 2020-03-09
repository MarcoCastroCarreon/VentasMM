import { User } from "../../persistence/entitites/user.entity";



export default class UserDAO{

    static async saveUser(user: User): Promise<void>{
        await User.save(user);
    }
    
}