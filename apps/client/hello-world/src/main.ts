/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { AppService } from './app/app.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  Logger.log(`🚀 Application is running`);

  const appService = app.get(AppService);

  try {
    await appService.execute();

    app.close();
    process.exit();
  } catch (err) {
    Logger.error(err);

    app.close();
    process.exit(-1);
  }
}

bootstrap();
