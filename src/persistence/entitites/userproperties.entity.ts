import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";



@Entity({name: 'USER_PROPERTIES'})
export class UserProperties extends BaseEntity{

    @OneToOne(type => User, user => user.userProperties)
    @JoinColumn({name: 'USER_ID'})
    user: User;

    @Column({name: 'NAME'})
    name: string;
    
    
}