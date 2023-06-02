import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';

@Module({
    imports: [TypeOrmExModule.forCustomRepository([UserRepository]) ,PassportModule],
    providers: [AuthService, LocalStrategy], 
})
export class AuthModule {}
