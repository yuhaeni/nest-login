import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { UserRepository } from 'src/repository/user.repository';

@Module({
  imports: [TypeOrmExModule.forCustomRepository([UserRepository])], //UserRepository 등록
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
