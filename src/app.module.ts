import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
<<<<<<< HEAD
    TypeOrmModule.forRoot()
=======
    CitiesModule,
>>>>>>> 588052d571d38bd58434fcca842d094fd5561b3a
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
