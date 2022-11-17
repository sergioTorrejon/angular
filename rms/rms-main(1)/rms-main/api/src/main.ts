import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';
import { CONFIG_ENV } from './config/config';
import { globalPipe } from './core/common/pipes/global/global.pipe';
import { logger } from './services/logger/logger.service';
import { initSwagger } from './utils/libs/swagger/swagger';

async function bootstrap() {
  console.log(CONFIG_ENV)
  const app = await NestFactory.create<NestExpressApplication>(AppModule); // CREATE APPLICATION WITH NESTJS AND EXPRESS
  initSwagger(app); //DOCUMENTATION APP WITH SWAGGER
  app.enable('trust proxy'); //ENABLED PROXY TRUST (PROXY DE CONFIANZA)
  app.enableCors(); //SETTING CORS
  app.useGlobalPipes(new ValidationPipe(globalPipe)); //SETTING PIPES
  await app.listen(CONFIG_ENV.SERVER_PORT); //RUN API REST
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      always:true,
      whitelist: true,
    }),
  );
  logger.setContext(`RUN`)
  logger.log(`API RUN http://localhost:${CONFIG_ENV.SERVER_PORT}`)
  logger.log(`API VERIFY http://localhost:${CONFIG_ENV.SERVER_PORT}/estado`)
}
bootstrap();
