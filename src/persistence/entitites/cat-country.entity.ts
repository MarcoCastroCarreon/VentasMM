import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import UserProperties from "./userproperties.entity";

@Entity({name: 'CAT_COUNTRY'})
export default class CatCountry extends BaseEntity{

    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: 'COUNTRY_NAME'})
    countryName: string;

    @Column({name: 'COUNTRY_CODE'})
    countryCode: string;

    @OneToOne(type => UserProperties, userProperties => userProperties.country)
    userProperties: UserProperties;

    static getCountryById(id: number): Promise<CatCountry>{
        return this.createQueryBuilder('country')
            .where('country.id = :id', {id})
            .getOne();
    }
}