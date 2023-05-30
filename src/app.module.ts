import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      //토큰 서명 값 설정
      secret: process.env.JWT_SECRET_KEY,
      //토큰 유효시간 (임의 60초)
      signOptions: { expiresIn: '60s' },
    }),
    ConfigModule.forRoot({
      isGlobal: true
      ,envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    UserModule,
  ],
})
export class AppModule {}
