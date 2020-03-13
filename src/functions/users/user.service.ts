import * as uuid from 'uuid';
import { CreateUserRequest, CreateUserResponse, InfoAdminResponse } from "./interface/user.interface";
import User from "../../persistence/entitites/user.entity";
import UserDAO from "./user.dao";
import UserProperties from "../../persistence/entitites/userproperties.entity";
import UserPropertiesDAO from "./user-properties.dao";
import { UserTypesEnum } from "../../commons/enums/types-users.enum";
import { ConflictException, InternalServerErrorException } from "../../commons/responses/Exception.index";
import { UserStatusEnum } from "../../commons/enums/user-status.enum";
import { Utils } from '../../commons/utils/utils'
import CatCountryDAO from '../../persistence/cat-dao/cat-country.dao';

export default class UserServices {

    /**
     * 
     * @author alma
     * @param data The info required of new user 
     * @returns {Promise} The user basic data.
     * 
     */
    static async createUser(data: CreateUserRequest): Promise<CreateUserResponse> {
        console.log(`Service START -->${this.createUser.name}`);
        const { email, password, name, lastName, country, phone, address } = data;

        const findUser = await UserDAO.getUserByEmail(email);
        if (findUser) throw new ConflictException('VENTAS_MM_COMMON_CONFLICT_409', { error: `user ${data.email} already exist` });

        const user = new User();
        const userProperties = new UserProperties();
        const tok = uuid.v4();
        user.email = email;
        user.password = await Utils.encryptPassword(password);
        user.userType = UserTypesEnum.ADMIN;
        user.status = UserStatusEnum.PENDING_CONFIRMATION;
        user.creationDate = new Date();
        user.token = tok;

        userProperties.name = name;
        userProperties.lastName = lastName;
        userProperties.country = await CatCountryDAO.getCountryById(country);
        userProperties.phone = phone;
        userProperties.address = address;

        try {
            const userP = await UserDAO.saveUser(user);

            userProperties.user = userP;
            await UserPropertiesDAO.saveUserProperties(userProperties);
        } catch (errors) {
            throw new InternalServerErrorException('VENTAS_MM_COMMON_INTERNAL_SERVER_ERROR_500', { errors });
        }

        console.log(`Service END -->${this.createUser.name}`);
        return {
            id: user.id,
            email: user.email,
            userType: user.userType
        }

    }

    /**
     * 
     * @author alma
     * @param userId The user id
     * @returns {Promise} The info user data
     * 
     */  
    static async infoAdmin(userId: number): Promise<InfoAdminResponse> {
        console.log(`Service START --> ${this.infoAdmin.name}`);
        const user: User = await UserDAO.getUserById(userId);
        if (!user) throw new ConflictException('VENTAS_MM_COMMON_NOT_FOUND_404', { error: `user ${userId} not exist` });
        const { userType, status, creationDate, userProperties } = user;
        console.log(`Service END --> ${this.infoAdmin.name}`);
        return {
            name: userProperties.name,
            lastName: userProperties.lastName,
            userType,
            status,
            creationDate
        }
    }

     /**
     * 
     * @author alma
     * @param userId The user id
     * @param token The token of user
     * @returns {Promise} Object of type User
     * 
     */  
    static async confirmUser(userId: number, token: string): Promise<void> {
        console.log(`Service START --> ${this.confirmUser.name}`);
        const user: User = await UserDAO.findUser(userId, token);

        if (!user) throw new ConflictException('VENTAS_MM_COMMON_NOT_FOUND_404', { error: `user ${userId} not exist` });
        user.status = UserStatusEnum.ENABLED;
        await UserDAO.saveUser(user);
        console.log(`Service END --> ${this.confirmUser.name}`);
    }
}