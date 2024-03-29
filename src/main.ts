import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DatabaseConfig } from './configs/configuration.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config_service = app.get(ConfigService);
  const logger = new Logger(bootstrap.name);
  app.useGlobalPipes(new ValidationPipe());
  const database_env = config_service.get<DatabaseConfig>('database');
  logger.debug(database_env);
  await app.listen(Number(config_service.get('PORT')));
}
bootstrap();
