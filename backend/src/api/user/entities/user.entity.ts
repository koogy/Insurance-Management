import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;


    @Column({ default: 'Paris' })
    city: string;

    @Column({
        length: 15,
        unique: true,
        default: ''
    })
    phoneNumber: string;

    @Column({ default: '' })
    address: string;

    @Column({
        length: 5,
        default: '00000'
    })
    postalCode: string;


    @Column({default: false})
    isEmailConfirmed: boolean

    @Column({default: false})
    isAdmin: boolean
}
