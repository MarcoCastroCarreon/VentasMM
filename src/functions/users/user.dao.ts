import User from "../../persistence/entitites/user.entity";
import UserProperties from "../../persistence/entitites/userproperties.entity";

export default class UserDAO {

    /**
     * Save a new user 
     * @author alma
     * @param user The type User entity
     * @returns {Promise} The user info
     */
    static async saveUser(user: User): Promise<User> {
        console.log(`DAO START --> ${this.saveUser.name}`);
        await User.save(user);
        console.log(`DAO END --> ${this.saveUser.name}`);
        return user;
    }
    /**
     * Search user by email  
     * @author alma
     * @param email The user email
     * @returns {Promise} The user info
     */
    static async getUserByEmail(email: string): Promise<User> {
        console.log(`DAO: START --> ${this.getUserByEmail.name}`);
        const user = await User.getUserByEmail(email);
        console.log(`DAO: END --> ${this.getUserByEmail.name}`);
        return user;
    }
    /**
     * Search user by id
     * @author alma
     * @param id The user id
     * @returns {Promise} The user info
     */
    static async getUserById(id: number): Promise<User> {
        console.log(`DAO: START -->${this.getUserById.name}`);
        const user = await User.getUserById(id);
        console.log(`DAO: END -->${this.getUserById.name}`);
        return user;
    }

    /**
     * Search user by id and token 
     * @author alma
     * @param id The user id
     * @param token The user token
     * @returns {Promise} The user info
     */
    static async findUser(id: number, token: string): Promise<User> {
        console.log(`DAO: START -->${this.findUser.name}`);
        const user = await User.findUser(id, token);
        console.log(`DAO: END -->${this.findUser.name}`);
        return user;
    }

   /**
     * Search user by id  
     * @author alma
     * @param id The user id
     * @returns {Promise} The user info
     */
    static async findUserById(userId): Promise<User> {
        console.log(`DAO: START -->${this.findUserById.name}`);
        const user = await User.findUserById(userId);
        console.log(`DAO: END -->${this.findUserById.name}`);
        return user;
    }

    /**
     * Delete user  
     * @author alma
     * @param user type User entity
     * @returns {Promise} void
     */
    static async deleteUser(user: User): Promise<void> {
        console.log(`DAO: START -->${this.deleteUser.name}`);
        await User.remove(user);
        console.log(`DAO: END -->${this.deleteUser.name}`);
    }

}