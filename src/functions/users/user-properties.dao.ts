import  UserProperties  from "../../persistence/entitites/userproperties.entity";

export default class UserPropertiesDAO{

    static async saveUserProperties(user: UserProperties): Promise<void>{
        await UserProperties.save(user);
    }

    /**
     * Search user properties by id  
     * @author alma
     * @param id The user id
     * @returns {Promise} The user properties info
     */
    static async findUserById(userId): Promise<UserProperties> {
        console.log(`DAO: START -->${this.findUserById.name}`);
        const user = await UserProperties.findUserById(userId);
        console.log(`DAO: END -->${this.findUserById.name}`);
        return user;
    }
   
    /**
     * Delete user properties  
     * @author alma
     * @param user type UserProperties entity
     * @returns {Promise} void
     */
    static async deleteUser(user: UserProperties): Promise<void> {
        console.log(`DAO: START -->${this.deleteUser.name}`);
        await UserProperties.delete(user);
        console.log(`DAO: END -->${this.deleteUser.name}`);
    }
}