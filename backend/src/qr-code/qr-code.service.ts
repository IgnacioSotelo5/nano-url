import { Injectable, BadRequestException, Inject, forwardRef, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import * as QRCode from 'qrcode'
import { join } from 'path';
import { access, mkdir, rm } from 'fs/promises';
import { LINKS_REPOSITORY, QR_CODE_REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { QrCode } from './entities/qr-code.entity';
import { Link } from 'src/links/entities/link.entity';
import { LinksService } from 'src/links/links.service';

@Injectable()
export class QrCodeService {
  private dirPath = join(__dirname, '..', '..', 'storage', 'qr_codes');

  constructor(
    @Inject(QR_CODE_REPOSITORY)
    private qrCodeRepository: Repository<QrCode>,
    @Inject(LINKS_REPOSITORY)
    private linksRepository: Repository<Link>,
    @Inject(forwardRef(() => LinksService))
    private readonly linksService: LinksService
  ){}

  async createQRCodeFile(createQrCodeDto: CreateQrCodeDto, linkId: string) {   
    const { originalUrl, qrType, color, redirectionUrl } = createQrCodeDto;
    
    const filename = `${Date.now()}.${qrType || 'png'}`;
    const path = join(this.dirPath, filename);
  
    try {
      await mkdir(this.dirPath, { recursive: true });
  
      try {
        new URL(originalUrl); 
      } catch (error) {
        throw new BadRequestException('Invalid URL provided');
      }

      await QRCode.toFile(path, redirectionUrl, {
        type: qrType || 'png',
        errorCorrectionLevel: 'H',
        width: 300,
        color
      });
  
      const newQRCode = this.qrCodeRepository.create({
        qrImageFilename: filename,
        colorDark: color.dark,
        colorLight: color.light,
        link: {id: linkId}
      })
  
      return await this.qrCodeRepository.save(newQRCode);
      
    } catch (error) {
      console.error(error)
      throw new BadRequestException('Failed to create QR code');
    }
  }  

  async findAllQR() {
    const QRCodes: QrCode[] = await this.qrCodeRepository
    .createQueryBuilder('qr_code')
    .leftJoinAndSelect('qr_code.link', 'link')
    .leftJoinAndSelect('link.user', 'user')
    .select([
      'qr_code.id',
      'qr_code.qrImageFilename',
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
    ])
    .getMany()
    
    return QRCodes    
  }

  async findQrById(id: string) {
    const qr = await this.qrCodeRepository
    .createQueryBuilder('qr_code')
    .leftJoinAndSelect('qr_code.link', 'link') 
    .leftJoinAndSelect('link.user', 'user')
    .select([
      'qr_code.id',
      'qr_code.qrImageFilename',
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
    ])
    .where('qr_code.id = :id', {id})
    .getOne()    
    

    return qr
  }

  async findQrBySlug(slug: string) {
    const qr = await this.qrCodeRepository
    .createQueryBuilder('qr_code')
    .leftJoinAndSelect('qr_code.link', 'link') 
    .leftJoinAndSelect('link.user', 'user')
    .select([
      'qr_code.id',
      'qr_code.qrImageFilename',
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
    ])
    .where('link.shortUrl = :shortUrl', {shortUrl: slug})
    .getOne()   
    
    

    return qr
  }

  async updateQR(id: string, updateQrCodeDto: UpdateQrCodeDto) {
    
    const qr = await this.qrCodeRepository.findOne({where: {
      id: id
    }, relations: ['link']})
    const link = qr.link
    const {redirectionUrl} = updateQrCodeDto
    
    if(redirectionUrl){
      const currentQR = join(this.dirPath, qr.qrImageFilename)
      
      try {
        await access(currentQR)
        await rm(currentQR) 
      } catch (error) {
        console.error(error)
        throw new InternalServerErrorException('Error deleting outdated QR.', error.message)
      }
      const createQrCodeDto: CreateQrCodeDto = {originalUrl: link.originalUrl, color: {dark: qr.colorDark, light: qr.colorLight}, redirectionUrl}
      const filename = `${Date.now()}.png`
      const newQr = await QRCode.toFile(join(this.dirPath, filename), redirectionUrl, {
        errorCorrectionLevel: 'H',
        width: 300,
        color: createQrCodeDto.color
      })
      
      this.qrCodeRepository.merge(qr, {qrImageFilename: filename})
      
      

      return await this.qrCodeRepository.save(qr)
    }
        
    const {customShortUrl: currentCustomSlug, title: currentTitle} = link
    const {customShortUrl: newCustomSlug, title: newTitle} = updateQrCodeDto.link   
    
    if(currentCustomSlug !== newCustomSlug || currentTitle !== newTitle){      
      const updateLink = await this.linksService.updateLink(link.id, {customShortUrl: newCustomSlug, title: newTitle})
      return updateLink
    }

  }

  

async remove(id: string) {
  const qr = await this.qrCodeRepository.findOneBy({ id });

  if (!qr) {
    throw new NotFoundException(`QR Code with ID ${id} doesn't exist.`);
  }

  try {
    const result = await this.qrCodeRepository.delete(id);

    if (result.affected === 0) {
      throw new BadRequestException('Error while deleting QR Code from database');
    }

    const path = join(this.dirPath, qr.qrImageFilename);

    await access(path);
    await rm(path);

    return { message: 'QR code successfully deleted' };
  } catch (error) {
    throw new BadRequestException(`Failed to delete QR Code: ${error.message}`);
  }
}

}
