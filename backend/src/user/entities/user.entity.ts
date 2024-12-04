import { Link } from "src/links/entities/link.entity"
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"

export enum UIMode {
    light = 'light',
    dark = 'dark'
}

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {length: 255, nullable: true, unique: true})
    name: string

    @Column('varchar', {length: 60})
    password?: string

    @Column('varchar',{length: 255, unique: true})
    email: string

    @Column('text', {nullable: true})
    filename?: string

    @Column({
        type: 'enum',
        enum: UIMode,
        default: UIMode.dark,
        nullable: true
    })
    themePreference?: UIMode

    @Column('varchar', {length: 5, nullable: true})
    language?: string

    @OneToMany(() => Link, (link) => link.user)
    links: Link[]
}
