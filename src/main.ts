import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { NotFoundExceptionFilter } from './exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new NotFoundExceptionFilter());
  app.useStaticAssets(join(__dirname, '/../../', 'agil-client/dist'));
  await app.listen(process.env.Port || 3000);
}
bootstrap();
