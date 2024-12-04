import { Injectable, Inject, BadRequestException, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';
import { LINKS_REPOSITORY, USER_REPOSITORY } from 'src/constants';
import { User } from 'src/user/entities/user.entity';
import { LinksWithRelations } from './interfaces/links-relations.interface';
import { QrCodeService } from 'src/qr-code/qr-code.service';
import { CreateQrCodeDto } from 'src/qr-code/dto/create-qr-code.dto';
import { plainToClass, plainToInstance } from 'class-transformer';

@Injectable()
export class LinksService {

  constructor(
    @Inject(LINKS_REPOSITORY)
    private linksRepository: Repository<Link>,
    @Inject(USER_REPOSITORY)
    private userRepository: Repository<User>,
    @Inject(forwardRef(() => QrCodeService))
    private qrCodeService: QrCodeService
  ){

  }
  
  async create(createLinkDto: CreateLinkDto, id: string, generateQRCode: boolean = false): Promise<Link> {    
    const {originalUrl, customShortUrl, title} = createLinkDto;
    const user = await this.userRepository.findOneBy({id});    
    
    
    if (!user) {
        throw new NotFoundException(`User with ID ${id} not found.`);
    }
    
    const shortUrl = this.genShortCode();
    if (!originalUrl) {
        throw new BadRequestException('The destination link is requested.');
    }

    const data = {
        ...createLinkDto,
        shortUrl,
        customShortUrl,
        title,
    };

    const {password, ...userData} = user;
    
    const newLink = this.linksRepository.create({
        ...data,
        user: userData,
        qrCode: null,  
    });

    try {       

        return await this.linksRepository.save(newLink);
    } catch (error) {
      throw new BadRequestException('Failed to create link: ' + error.message);
    }
}


  async findAllLinks(): Promise<LinksWithRelations[]> {
    const links: Link[] = await this.linksRepository
        .createQueryBuilder('link')
        .leftJoinAndSelect('link.user', 'user')
        .leftJoin('link.clicks', 'click')
        .select([
            'link.id',
            'link.originalUrl',
            'link.shortUrl',
            'link.title',
            'link.domain',
            'link.customShortUrl',
            'link.created_at',
            'user.id', 
            'user.email',
            'user.name',
            'COUNT(click.id) AS clicks' // Contar clics
        ])
        .groupBy('link.id') // Agrupar por el ID del enlace
        .addGroupBy('user.id') // Agrupar también por el ID del usuario
        .getRawMany(); // Obtener los resultados en un formato adecuado        

     return links.map(link => this.formatLink(link));
}


  async findLinkById(id: string) {
    const link = await this.linksRepository
    .createQueryBuilder('link')
    .leftJoinAndSelect('link.user', 'user')
    .leftJoin('link.clicks', 'click')
    .select([
      'link.id',
      'link.originalUrl',
      'link.shortUrl',
      'link.title',
      'link.domain',
      'link.customShortUrl',
      'link.created_at',
      'user.id', 
      'user.email',
      'user.name',
      'COUNT(click.id) AS clicks' // Contar clics
  ])
  .where('link.id = :id', {id})
  .groupBy('link.id')
  .addGroupBy('user.id')
  .getRawOne()  

    if(!link) throw new NotFoundException(`Link with ID ${id} not found.`)
    return this.formatLink(link)
  }

  async findLinkBySlug(shortUrl: string) {
    
    const link = await this.linksRepository
    .createQueryBuilder('link')
    .leftJoinAndSelect('link.user', 'user')
    .leftJoinAndSelect('link.qrCode', 'qrCode')
    .leftJoin('link.clicks', 'click')
    .select([
      'link.id',
      'link.originalUrl',
      'link.shortUrl',
      'link.customShortUrl',
      'link.domain',
      'link.title',
      'link.created_at',
      'user.id', 
      'user.email',
      'user.name',
      'qrCode.id',
      'qrCode.qrImageFilename',
      'COUNT(click.id) AS clicks' // Contar clics
  ])
  .where('link.shortUrl = :shortUrl', {shortUrl})
  .groupBy('link.id')
  .addGroupBy('user.id')
  .addSelect("CONCAT(link.domain, '/', COALESCE(link.customShortUrl, link.shortUrl))", 'redirectionUrl')
  .getRawOne()   

  if(!link) throw new NotFoundException(`Link with ID ${shortUrl} not found.`)    

    
  const formattedLink = this.formatLink(link)  

    return formattedLink
  }

  async updateLink(id: string, updateLinkDto: UpdateLinkDto) {
    const link = await this.linksRepository.findOne({where: {
      id
    }, relations: ['qrCode']})
    if(!link){
      throw new NotFoundException(`Link with ID ${id} not found.`)
    }

    const currentQRContent = `${link.domain}/${link.customShortUrl || link.shortUrl}`

    const updatedLink = this.linksRepository.merge(link, updateLinkDto)
    
    try {
      const savedLink = await this.linksRepository.save(updatedLink)
      const newQRContent = `${savedLink.domain}/${savedLink.customShortUrl || savedLink.shortUrl}`

      if(currentQRContent !== newQRContent){       
        await this.qrCodeService.updateQR(savedLink.qrCode.id, {redirectionUrl: newQRContent})
      }

      return savedLink
    } catch (error) {
      console.error(error)
      throw new BadRequestException('Failed to update link: ' + error.message)
    }
  }

  async removeLink(id: string) {
    const link = await this.linksRepository.findOneBy({id})

    if(!link){
      throw new NotFoundException(`Link with ID ${id} doesn't exists.`)
    }
    
    try {      
      const result = await this.linksRepository.delete({id})      
      
      if(result.affected === 0) throw new BadRequestException('Error while deleting link')
      
        return
    } catch (error) {      
      throw new BadRequestException('Failed to delete link: ' + error.message)
    }

  }

  private genShortCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const array = new Uint8Array(8);
    crypto.getRandomValues(array);
    let shortCode = '';
    
    for (let i = 0; i < 8; i++) {
      shortCode += chars[array[i] % chars.length];
    }
    
    return shortCode;
  }
  

  private formatLink(link: any): LinksWithRelations{
    return{
      id: link.link_id,
      originalUrl: link.link_originalUrl,
      shortUrl: link.link_shortUrl,
      customShortUrl: link.link_customShortUrl,
      domain: link.link_domain,
      title: link.link_title,
      created_at: link.link_created_at,
      user: {
        id: link.user_id,
        email: link.user_email,
        name: link.user_name,
      },
      qrCode: {
        id: link.qrCode_id,
        qrImageFilename: link.qrCode_qrImageFilename
      },
      clicks: parseInt(link.clicks, 10) || 0
    }
  }
}
