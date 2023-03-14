import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserApi } from './user.api';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserApi],
  providers: [UserService],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
