import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DatabaseModule } from 'src/database/database.module';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigService } from '@nestjs/config';
import { invalidationTokenProvider } from './token-invalidation.provider';
import { InvalidationTokenService } from './token-invalidation.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async(configService: ConfigService): Promise<JwtModuleOptions> => ({
        global: true,
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: {
        expiresIn: '24h',
      }
      }),
      inject: [ConfigService]
    })
    
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    InvalidationTokenService,
    ...invalidationTokenProvider
  ],
  exports: [AuthService, InvalidationTokenService, JwtModule]
})
export class AuthModule {}
