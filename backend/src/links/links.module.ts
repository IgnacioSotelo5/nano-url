import { forwardRef, Module } from '@nestjs/common';
import { LinksService } from './links.service';
import { LinksController } from './links.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { linksProvider } from './links.provider';
import { DatabaseModule } from 'src/database/database.module';
import { userProvider } from 'src/user/user.provider';
import { QrCodeService } from 'src/qr-code/qr-code.service';
import { qrCodeProvider } from 'src/qr-code/qr-code.provider';

@Module({
  imports: [
    AuthModule, 
    DatabaseModule,

  ],
  controllers: [LinksController],
  providers: [
    ...qrCodeProvider,
    ...linksProvider,
    ...userProvider,
    LinksService,
    JwtService,
    QrCodeService,
  ]
})
export class LinksModule {}
