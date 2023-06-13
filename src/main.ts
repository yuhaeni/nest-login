import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as config from 'config';
import { HttpExceptionFilter } from './util/http-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 예외 필터 연결
  app.useGlobalFilters(new HttpExceptionFilter());
  
  const serverConfig = config.get('server');
  const port = serverConfig.port;
    
  await app.listen(port);

  // Global Middleware 설정 -> Cors 속성 활성화
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    optionsSuccessStatus: 200,
  });

}

bootstrap();
