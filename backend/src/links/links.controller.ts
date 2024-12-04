import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, HttpStatus, HttpCode, BadRequestException, Inject } from '@nestjs/common';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { QrCodeService } from 'src/qr-code/qr-code.service';
import { CreateQrCodeDto } from 'src/qr-code/dto/create-qr-code.dto';
import { LINKS_REPOSITORY } from 'src/constants';
import { Repository } from 'typeorm';
import { Link } from './entities/link.entity';

@Controller('links')
export class LinksController {
  constructor(
    @Inject(LINKS_REPOSITORY)
    private linksRepository: Repository<Link>, 
    private readonly linksService: LinksService,
    private readonly qrCodeService: QrCodeService
  ) {}

  @Post()
  async create(@Body() createLinkDto: CreateLinkDto, @Req() req) {
    const user_id = req.user.id
    const {generateQRCode} = createLinkDto
    
    
    try {
      const newLink = await this.linksService.create(createLinkDto, user_id);
      const {domain, customShortUrl, shortUrl} = newLink
      if(generateQRCode){
        const QRCodeDTO: CreateQrCodeDto = {
          ...createLinkDto,
          redirectionUrl: `${domain}/${customShortUrl || shortUrl}`
        }
        const newQRCode = await this.qrCodeService.createQRCodeFile(QRCodeDTO, newLink.id)

        this.linksRepository.merge(newLink, {qrCode: newQRCode})
        
        return await this.linksRepository.save(newLink)
      }
      return newLink
      
    } catch (error) {
      throw new BadRequestException('Error creating link or QR code. ', error.message);
    }
  }

  @Get('q')
  async findOneBySlug(@Query('shortUrl') shortUrl: string){   
    return await this.linksService.findLinkBySlug(shortUrl)
  }

  @Get()
  async findAll() {
    return await this.linksService.findAllLinks();
  }

  @Get(':id')
  async findOneById(@Param('id') id: string) {        
    return await this.linksService.findLinkById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto, @Req() req) {
    
    return await this.linksService.updateLink(id, updateLinkDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Req() req) {

    return await this.linksService.removeLink(id);
  }
}
