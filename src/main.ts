import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '/../../', 'agil-client/dist/browser'));
  // app.setBaseViewsDir(join(__dirname, '..', 'agil-client/dist'));
  // app.
    // engine('html').
    // useStaticAssets(join(__dirname, '/../../agil-client/dist'), {
    //   index: false,
    //   redirect: false,
    // });

  // app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
