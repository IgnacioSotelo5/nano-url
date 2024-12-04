import { Module } from '@nestjs/common';
import { QrCodeService } from './qr-code.service';
import { QrCodeController } from './qr-code.controller';
import { DatabaseModule } from 'src/database/database.module';
import { qrCodeProvider } from './qr-code.provider';
import { userProvider } from 'src/user/user.provider';
import { linksProvider } from 'src/links/links.provider';
import { LinksService } from 'src/links/links.service';
import { LinksModule } from 'src/links/links.module';

@Module({
  imports: [
    DatabaseModule,
    LinksModule,
  ],
  controllers: [QrCodeController],
  providers: [
    QrCodeService,
    LinksService,
    ...userProvider,
    ...linksProvider,
    ...qrCodeProvider,
  ],
})
export class QrCodeModule {}
