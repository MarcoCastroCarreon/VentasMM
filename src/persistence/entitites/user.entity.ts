import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { UserTypes } from "../../commons/enums/types-users.enum";
import { UserProperties } from "./userproperties.entity";


@Entity({name: 'USER'})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn ({name: 'ID'})
    id: number;

    @Column({name: 'EMAIL', nullable: false, type: 'varchar'})
    email: string;

    @Column({name: 'PASSWORD', nullable:false, type: 'varchar'})
    password: string;

    @Column({name: 'USER_TYPE', nullable:false, type: 'enum' , enum: UserTypes})
    userType: string;

    @Column({name: 'STATUS', nullable:false, type: 'varchar'})
    status: string;

    @Column({name: 'CREATION_DATE', nullable: false, type: 'date'})
    creationDate: Date;

    @OneToOne(type => UserProperties, userProperties => userProperties.user)
    userProperties: UserProperties;
}