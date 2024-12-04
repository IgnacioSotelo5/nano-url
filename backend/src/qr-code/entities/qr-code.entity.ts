import { Link } from "src/links/entities/link.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('qr_codes')
export class QrCode {
    @PrimaryGeneratedColumn()
    id: string

    @Column('varchar')
    qrImageFilename: string

    @Column('varchar', {length: 7})
    colorDark: string

    @Column('varchar', {length: 7})
    colorLight: string

    @OneToOne(() => Link, (link) => link.qrCode, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'link_id'})
    link: Link

}
