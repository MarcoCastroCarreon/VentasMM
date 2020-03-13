import  UserProperties  from "../../persistence/entitites/userproperties.entity";

export default class UserPropertiesDAO{

    static async saveUserProperties(user: UserProperties): Promise<void>{
        await UserProperties.save(user);
    }
}