import  UserProperties  from "../../persistence/entitites/userproperties.entity";

export default class UserPropertiesDAO{

    static async saveUserProperties(user: UserProperties): Promise<void>{
        await UserProperties.save(user);
    }

    static async getUserPropertiesById(userId: number): Promise<UserProperties>{
        console.log(`DAO: START -->${this.getUserPropertiesById.name}`);
        const userProperties= await UserProperties.getUserPropertiesById(userId);
        console.log(`DAO: END -->${this.getUserPropertiesById.name}`);
        return userProperties;
    }
}