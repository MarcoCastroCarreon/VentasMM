import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserTypesEnum } from "../../commons/enums/types-users.enum";
import UserProperties from "./userproperties.entity";
import { UserStatusEnum } from "../../commons/enums/user-status.enum";


@Entity({name: 'USER'})
export default class User extends BaseEntity{

    @PrimaryGeneratedColumn({name: 'ID'})
    id: number;

    @Column({name: 'EMAIL', nullable: false, type: 'varchar'})
    email: string;

    @Column({name: 'PASSWORD', nullable:false, type: 'varchar'})
    password: string;

    @Column({name: 'USER_TYPE', nullable:false, type: 'enum' , enum: UserTypesEnum})
    userType: string;

    @Column({name: 'STATUS', nullable:false, type: 'enum', enum: UserStatusEnum})
    status: string;

    @Column({name: 'CREATION_DATE', nullable: false, type: 'date'})
    creationDate: Date;

    @Column({name: 'TOKEN', nullable: false, type:'varchar'})
    token: string;
    
    @OneToOne(_type => UserProperties, userProperties => userProperties.user)
    userProperties: UserProperties;

    static getUserByEmail(email: string): Promise<User> {
        return this.createQueryBuilder('user')
            .where('user.email = :email', {email})
            .getOne();
    }
}