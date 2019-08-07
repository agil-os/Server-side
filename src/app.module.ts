import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    CitiesModule,
    TripsModule,
    PricesModule,
    UsersModule,
    CarsModule,
    GasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
