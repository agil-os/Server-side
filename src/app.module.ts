import { Module } from '@nestjs/common';
// import { GraphQLModule } from '@nestjs/graphql';
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
import { ConfigModule } from 'nestjs-dotenv';
import { DatabaseModule } from './database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot('../.env'),
    // GraphQLModule.forRoot({
    //   typePaths: ['./**/*.graphql'],
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.ts'),
    //   },
    // }),
    DatabaseModule,
    CitiesModule,
    TripsModule,
    PricesModule,
    UsersModule,
    CarsModule,
    GasModule,
    CategoriesModule,
    QualityModule,
    AuthModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
