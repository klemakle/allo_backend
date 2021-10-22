import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './utils/logger/index';
import * as compression from 'compression';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(compression());
  app.use(helmet());
  const port = app.get(ConfigService).get('port');
  await app.listen(port);
  logger.info(`Allo'Voyage is up and running on: ${await app.getUrl()}`);
}
bootstrap();
