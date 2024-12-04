import { Controller, Get, Param, Redirect, HttpRedirectResponse, HttpStatus, NotFoundException, Query, Res, Render } from '@nestjs/common';
import { Response } from 'express';
import { ClicksService } from 'src/clicks/clicks.service';
import { IsRedirection } from 'src/decorators/redirection.decorator';
import { RedirectInterceptor } from 'src/interceptors/redirect.interceptor';
import { LinksService } from 'src/links/links.service';
import { QrCodeService } from 'src/qr-code/qr-code.service';

@Controller()
export class RedirectController {
    constructor(
        private clickService: ClicksService,
        private linkService: LinksService,
        private qrService: QrCodeService
    ){}
    
    
    @Get(':shortUrl')
    @IsRedirection()
    @Redirect()
    async redirectFromClick(@Param('shortUrl') shortUrl: string){        
        const link = await this.linkService.findLinkBySlug(shortUrl)
        if(!link){
            throw new NotFoundException(`Link with slug '${shortUrl}' not found.`)
        }        
        
        const response: HttpRedirectResponse = {
            url: link.originalUrl,
            statusCode: HttpStatus.MOVED_PERMANENTLY
        }

        return response

    }   


  @Get('v/:shortUrl')
  @IsRedirection()
  @Render('redirect') // Usamos el renderizado de la plantilla 'redirect.hbs'
  async redirectWithView(@Param('shortUrl') shortUrl: string) {
    const link = await this.linkService.findLinkBySlug(shortUrl);
    if (!link) {
      throw new NotFoundException(`Link with slug '${shortUrl}' not found.`);
    }

    const {originalUrl, title} = link

    // Devolvemos la URL original y el título para la plantilla
    return {
      originalUrl ,
      title
    };
  }

  @Get(':shortUrl/r')
  @IsRedirection()
  @Redirect()
  async redirectFromScan(@Param('shortUrl')slug: string, @Query() redirectType: string){
    const qr = await this.qrService.findQrBySlug(slug)
    if(!qr){
        throw new NotFoundException(`QR not found`)
    }

    if(redirectType === 'qr'){
        const newScan = 'Crear un repositorio de scans para guardar un nuevo registro en la bbdd, asi como lo haria con los clicks en los enlaces'
    }

    const response: HttpRedirectResponse = {
        url: qr.link.originalUrl,
        statusCode: HttpStatus.MOVED_PERMANENTLY
    }

    return response
  }
}
