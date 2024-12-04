import { Link } from "src/links/entities/link.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('clicks')
export class Click {
    @PrimaryGeneratedColumn()
    id: string

    @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP'})
    clickedAt: Date

    @Column('varchar', { length: 45})
    ip: string

    @Column('varchar', {nullable: true})
    location: string

    @Column('varchar', { nullable: true })
    userAgent: string

    @Column('varchar', {nullable: true})
    referer: string

    @ManyToOne(()=> Link, (link) => link.clicks)
    @JoinColumn({name: 'link_id'})
    link: Link
}
