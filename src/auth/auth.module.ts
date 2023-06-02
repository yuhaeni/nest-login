import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/repository/user.repository';
import { LocalStrategy } from './strategies/auth.local.strategy';
import { AuthService } from './auth.service';
import { TypeOrmExModule } from 'src/db/typeorm-ex.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/auth.jwt.strategy';

@Module({
    imports: [
        TypeOrmExModule.forCustomRepository([UserRepository]) ,
        PassportModule,
        JwtModule.register({
            // 토큰 서명 값 설정
            secret: jwtConstants.secret ,
            // 토큰 유효시간 (임의 60초)
            signOptions: {expiresIn: '60s'},
        }),
        TypeOrmModule.forFeature([UserRepository]),
    ],
    providers: [AuthService, LocalStrategy ,JwtStrategy], 
    exports: [AuthService],
})
export class AuthModule {}
