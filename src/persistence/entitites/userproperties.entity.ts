import 'reflect-metadata'
import { Entity, BaseEntity, Column, OneToOne, JoinColumn } from "typeorm";
import User  from "./user.entity";
import CatCountry from './cat-country.entity';

@Entity({name: 'USER_PROPERTIES'})
export default class UserProperties extends BaseEntity{

    @OneToOne(type => User, user => user.userProperties, {primary: true})
    @JoinColumn({name: 'USER_ID'})
    user: User;

    @Column({name: 'NAME'})
    name: string;

    @Column({name: 'LAST_NAME'})
    lastName: string;

    @OneToOne(type => CatCountry, catCountry => catCountry.userProperties)
    @JoinColumn({name: 'COUNTRY_ID'})
    country: CatCountry;

    @Column({name: 'PHONE'})
    phone: string;

    @Column({name: 'ADDRESS'})
    address: string;


    static getUserPropertiesById(userId: number): Promise<UserProperties>{
        return this.createQueryBuilder('userProperties')
            .leftJoinAndSelect('userProperties.user','user')
            .where('user.id = :userId', {userId})
            .getOne()
    }

}