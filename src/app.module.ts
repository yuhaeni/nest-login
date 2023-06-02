import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig), // TypeORM 설정 파일 연결
    UserModule, AuthModule, 
  ],
  providers: [],
  // imports: [
  //   PassportModule,
  //   JwtModule.register({
  //     //토큰 서명 값 설정
  //     secret: process.env.JWT_SECRET_KEY,
  //     //토큰 유효시간 (임의 60초)
  //     signOptions: { expiresIn: '60s' },
  //   }),
  //   ConfigModule.forRoot({
  //     isGlobal: true
  //     ,envFilePath: `.${process.env.NODE_ENV}.env`
  //   }),
  //   UserModule,
  // ],
})


export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(LoggerMiddleware)
      .exclude({path:'user/list', method: RequestMethod.GET})  //이 url에 대해서는 Middleware 사용 제외
      .forRoutes('/users');
  }
}
