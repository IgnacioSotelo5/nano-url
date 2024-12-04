import { Controller, Get, Post, Body, Patch, Param, Delete, Req, BadRequestException, NotFoundException, Res, Query, Inject } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { CreateQrCodeDto } from './dto/create-qr-code.dto';
import { UpdateQrCodeDto } from './dto/update-qr-code.dto';
import { LinksService } from 'src/links/links.service';
import { join } from 'path';
import { createReadStream, promises as fs } from 'fs';
import * as mime from 'mime-types'
import { Response } from 'express';
import { plainToInstance } from 'class-transformer';
import { LINKS_REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { Link } from 'src/links/entities/link.entity';

@Controller('qr-code')
export class QrCodeController {
  constructor(
    private readonly qrCodeService: QrCodeService,
    private readonly linksService: LinksService,
    @Inject(LINKS_REPOSITORY)
    private linksRepository: Repository<Link>
  ) {}



  @Get('file/:filename')
  async getProfileImage(@Param('filename') filename: string, @Res() res: Response){
    //Construimos la ruta al archivo con join
    const filePath = join(__dirname, '..', '..', 'storage', 'qr_codes', filename)    

    try {
      //verificamos si el archivo existe en la ruta
      await fs.access(filePath)
    } catch (error) {   
      //lanzamos Excepcion si no existe
      throw new NotFoundException('File not found.')
    }
    //Se determina el tipo MIME del archivo en caso de existir
    const mimeType = mime.lookup(filePath) || 'application/octet-stream'
    //Luego configuramos un header con el content-type que contiene el valor del tipo mime
    res.setHeader('Content-Type', mimeType)
    //se crea un ReadableStream del archivo y se envia al cliente 
    //utilizando fileStream.pipe(res)
    const fileStream = createReadStream(filePath)
    
    fileStream.pipe(res)
    
  }

  @Post()
  async create(@Body() createQrCodeDto: CreateQrCodeDto, @Req() req) {
    const userId = req.user.id
    
    const linkDto = {
      ...createQrCodeDto,
      generateQRCode: true
    }
    
    try {
      const newLink = await this.linksService.create(linkDto, userId, linkDto.generateQRCode)
          
      const {domain, customShortUrl, shortUrl} = newLink
        const redirectionUrl = `${domain}/${customShortUrl || shortUrl}`
        
        createQrCodeDto =  plainToInstance(CreateQrCodeDto, {...createQrCodeDto, redirectionUrl})
          
        const newQrCode = await this.qrCodeService.createQRCodeFile(createQrCodeDto, newLink.id);

        this.linksRepository.merge(newLink, { qrCode: newQrCode });
        
        return await this.linksRepository.save(newLink);      
    } catch (error) {
      throw new BadRequestException('Failed to create Qr code', error.message)
    }
  }

  @Get()
  findAll() {
    return this.qrCodeService.findAllQR();
  }
  
  @Get('q')
  async findOneBySlug(@Query('shortUrl') shortUrl: string){   
    return await this.qrCodeService.findQrBySlug(shortUrl)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.qrCodeService.findQrById(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQrCodeDto: UpdateQrCodeDto) {
    return this.qrCodeService.updateQR(id, updateQrCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.qrCodeService.remove(id);
  }
}
