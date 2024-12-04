import { Click } from "src/clicks/entities/click.entity";
import { QrCode } from "src/qr-code/entities/qr-code.entity";
import { User } from "src/user/entities/user.entity";
import { AfterLoad, Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from "typeorm";

@Entity('links')
export class Link {
    @PrimaryGeneratedColumn()
    id: string
    
    @Column('text')
    originalUrl: string

    @Column('varchar', {unique: true, length: 8 })
    shortUrl: string

    @Column('varchar', {nullable: true, length: 20})
    customShortUrl: string

    @Column('varchar', {default: 'http://localhost:3000'})
    domain: string

    @Column('varchar', {nullable: true})
    title: string

    @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP'})
    created_at: Date

    @OneToMany(()=> Click, (click) => click.link)
    clicks: Click[]

    @ManyToOne(() => User, (user) => user.links, {eager: true})
    @JoinColumn({name: 'user_id'})
    user: User

    @OneToOne(() => QrCode, (qrCode) => qrCode.link, {nullable: true, cascade: true, onDelete: 'CASCADE'})
    @JoinColumn({name: 'qr_id'})
    qrCode: QrCode

    @VirtualColumn({
        query: (link) => `CONCAT(${link}.domain, '/', ${link}.shortUrl)`
    })
    redirectionUrl: string
}
