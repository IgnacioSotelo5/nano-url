import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProvider } from './user.provider';
import { DatabaseModule } from 'src/database/database.module';


@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    ...userProvider,
    UserService,
  ],
  exports: [UserService]
})
export class UserModule {}
