import { Controller, Get, Post, Delete, Patch, Body, Param, Put } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';
import { lasVegasData } from '../../sample_data/numbeo/lasVegas.js';
import { flightData } from '../../sample_data/Flights/flightData.js';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';


@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService) { }

    //gets all data from the prices table
  @Get()
  async findAll(): Promise<PricesEntity[]> {
    return this.PricesService.findAll();
  }
  //gets food prices from dummy data
  @Get('food')
  async findFood(): Promise<PricesEntity[]> {
    let low = Number((lasVegasData
    .prices
    .filter((food) => food.item_id === 1)[0]
      .lowest_price))

    let high = lasVegasData
      .prices
      .filter((food) => food.item_id === 1)[0]
      .highest_price

    let average = (high + low) / 2;

    let food = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];
    return food;
  }
  //gets flight prices from dummy data
  @Get('flight')
  async findFlight(): Promise<PricesEntity[]> {
    let low = flightData[0]
    .data
    .reduce((low, flight) =>{
      low = flight.price
      if(low > flight.price){
        low = flight.price
      }
      return low;
    }, 0)

    let high = flightData[0]
      .data
      .reduce((high, flight) => {
        if (high <= flight.price) {
          high = flight.price
        }
        return high;
      }, 0)

    let average = flightData[0]
      .data
      .reduce((average, flight) => {
        average += flight.price

        return average;
      }, 0) / flightData[0].data.length

    let flight = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];

    return flight;
  }

  @Get('hotel')
  async findHotel(): Promise<PricesEntity[]> {

    let prices = hotelsData.result
    .map((hotels) =>{
      return hotels.min_total_price
    }).filter(price => price < 1000 && price > 0)

    let low = (prices
    .reduce((low, hotel) =>{ 
      if(low > hotel){
        low = hotel;
      }
      return low;
    }))

    let high = prices
    .reduce((low, hotel) =>{ 
      if(low < hotel){
        low = hotel;
      }
      return low;
    })

    let average = (prices
    .reduce((low, hotel) =>{ 
      low += hotel;
      return low;
    }, 0) / prices.length);

    let hotel = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];

    return hotel;
  }

    //gets specific prices from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<PricesEntity> {
    return this.PricesService.read(id);
  }

  //posts data into prices table
  @Post('create')
  async create(@Body() pricesData: PricesEntity): Promise<any> {
    return this.PricesService.create(pricesData);
  }

    //updates data based on prices id
  @Put(':id/')
  async update(@Param('id') id, @Body() pricesData: PricesEntity): Promise<any> {
    pricesData.id = Number(id);
    console.log('Update #' + pricesData.id)
    return this.PricesService.update(pricesData);
  }

    //deletes data based on prices id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.PricesService.delete(id);
  }

}
