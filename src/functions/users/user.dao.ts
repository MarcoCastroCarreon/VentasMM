import User from "../../persistence/entitites/user.entity";
import UserProperties from "../../persistence/entitites/userproperties.entity";



export default class UserDAO{

    static async saveUser(user: User): Promise<User>{
        console.log(`DAO START --> ${this.saveUser.name}`);
        await User.save(user);
        console.log(`DAO END --> ${this.saveUser.name}`);
        return user;
    }

    static async getUserByEmail(email: string): Promise<User> {
        console.log(`DAO: START --> ${this.getUserByEmail.name}`);
        const user = await User.getUserByEmail(email);
        console.log(`DAO: END --> ${this.getUserByEmail.name}`);
        return user;
    }

    static async getUserById(id: number): Promise<User>{
        console.log(`DAO: START -->${this.getUserById.name}`);
        const user= await User.getUserById(id);
        console.log(user)
        console.log(`DAO: END -->${this.getUserById.name}`);
        return user;
    }


    
}