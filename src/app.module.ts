import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';
import { TripsModule } from './trips/trips.module';
import { PricesModule } from './prices/prices.module';
import { UsersModule } from './users/users.module';
import { CarsModule } from './cars/cars.module';
import { GasModule } from './gas/gas.module';
import { CategoriesModule } from './categories/categories.module';
import { QualityController } from './quality/quality.controller';
import { QualityModule } from './quality/quality.module';
import { Connection } from 'typeorm';
import { HttpModule } from '@nestjs/common';
import { LodgingModule } from './lodging/lodging.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: 'agilos',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      logging: true,
    }
// process.env.DB_USERNAME
// process.env.DB_PASSWORD
    ),
    CitiesModule,
    TripsModule,
    PricesModule,
    UsersModule,
    CarsModule,
    GasModule,
    CategoriesModule,
    QualityModule,
    HttpModule,
    LodgingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
