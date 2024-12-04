import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LinksModule } from './links/links.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StatsModule } from './stats/stats.module';
import { TagsModule } from './tags/tags.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ClicksModule } from './clicks/clicks.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { QrCodeModule } from './qr-code/qr-code.module';
import { RedirectModule } from './redirect/redirect.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    LinksModule,
    AuthModule,
    UserModule, 
    StatsModule, 
    TagsModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    ClicksModule,
    QrCodeModule, 
    RedirectModule,
    DatabaseModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    {
      provide: 'APP_INTERCEPTOR',
      useClass: ResponseInterceptor
    }
  ],
})

export class AppModule {}