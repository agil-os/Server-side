import { Controller, Get, Post, Delete, Patch, Body, Param, Put, HttpService } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';
import { lasVegasData } from '../../sample_data/numbeo/lasVegas.js';
import { flightData } from '../../sample_data/Flights/flightData.js';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';
import { EnvModule } from '../env.module';
import { EnvService } from '../env.service';
import { findFieldsThatChangedTypeOnInputObjectTypes } from 'graphql/utilities/findBreakingChanges';
import { CitiesEntity } from 'src/cities/cities.entity';

const config = new EnvService().read();
@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService,
              private readonly http: HttpService,
    ) { }

  @Get('hotel/:qualityId/:city/:arrival/:departure')
  async root(@Param('city') city, @Param('arrival') arrival, @Param('departure') departure, @Param('qualityId') qualityId) {
    const headerRequest = {
      'x-rapidapi-key': config.AK_Booking,
    };
    // tslint:disable-next-line:max-line-length
    const response = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}`, {headers: headerRequest}).toPromise();
    const cityId = response.data[0].dest_id;

    // tslint:disable-next-line:max-line-length
    const prices = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?search_type=city&offset=0&dest_ids=${cityId}&guest_qty=1&arrival_date=${arrival}&departure_date=${departure}&room_qty=1`, { headers: headerRequest }).toPromise();
    const lowQuality = prices.data.result.map(hotel => hotel.min_total_price).filter(price => price < 1500 && price > 0);
    const midQuality = prices.data.result.map(hotel => hotel.min_total_price).filter(price => price > 1500 && price < 2000);
    const highQuality = prices.data.result.map(hotel => hotel.min_total_price).filter(price => price > 2000);

    if (qualityId === '1') {

      const low = lowQuality.reduce((low, hotel) => {
        if (low > hotel) {
          low = hotel;
        }
        return low;

      });
      const high = lowQuality.reduce((high, hotel) => {
        if (high < hotel) {
          high = hotel;
        }
        return high;
      });
      const average = lowQuality.reduce((ave, hotel) => {
        ave += hotel;
        return ave;
      }) / lowQuality.length;

      const cheapHotel = {
        low: Number(low.toFixed(2)),
        average: Number(average.toFixed(2)),
        high: Number(high.toFixed(2)),
      };

      return cheapHotel;
    }
    if (qualityId === '2') {
      const low = midQuality.reduce((low, hotel) => {
          if (low > hotel) {
            low = hotel;
          }
          return low;
        });
      const high = midQuality.reduce((high, hotel) => {
          if (high < hotel) {
            high = hotel;
          }
          return high;
        });
      const average = midQuality.reduce((ave, hotel) => {
          ave += hotel;
          return ave;
        }) / midQuality.length;

      const reasonableHotel = {
        low: Number(low.toFixed(2)),
        average: Number(average.toFixed(2)),
        high: Number(high.toFixed(2)),
      };

      return reasonableHotel;
    }
    if (qualityId === '3') {
      const low = highQuality.reduce((low, hotel) => {
          if (low > hotel) {
            low = hotel;
          }
          return low;
        });
      const high = highQuality.reduce((high, hotel) => {
          if (high < hotel) {
            high = hotel;
          }
          return high;
        });
      const average = highQuality.reduce((ave, hotel) => {
          ave += hotel;
          return ave;
        }) / highQuality.length;

      const reasonableHotel = {
        low: Number(low.toFixed(2)),
        average: Number(average.toFixed(2)),
        high: Number(high.toFixed(2)),
      };

      return reasonableHotel;
    }
  }

  @Get('flight/:qualityId/:flyFrom/:flyTo/:dateFrom/')
  async flightPrices(@Param('flyFrom') flyFrom, @Param('flyTo') flyTo, @Param('dateFrom') dateFrom, @Param('qualityId') qualityId) {
    // tslint:disable-next-line:max-line-length
    let classes = '';
    if(qualityId === '1'){
      classes = 'e';
    }
    if (qualityId === "2") {
      classes = 'b';
    }
    if (qualityId === '3') {
      classes = 'f';
    }
    const headerRequest = {
      'x-rapidapi-key': config.AK_Booking,
    };
    // tslint:disable-next-line:max-line-length
    const origin = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${flyFrom}`, { headers: headerRequest }).toPromise();
    const originCode = origin.data[0].searchFormPrimary;
    // tslint:disable-next-line:max-line-length
    const destination = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${flyTo}`, { headers: headerRequest }).toPromise();
    const destinationCode = destination.data[0].searchFormPrimary;
    // tslint:disable-next-line:max-line-length
    const response = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${originCode}&destination1=${destinationCode}&departdate1=${dateFrom}&cabin=${classes}&currency=USD&adults=1&bags=0`, { headers: headerRequest }).toPromise();
    // console.log(response);
    const flights = response.data;
    const flightPrices = flights.tripset.map(price => price.exactLow).filter(num => num > 0);
    let low = flightPrices.reduce((low, flight) =>{
      if(low > flight && low > 0 && flight > 0){
        low = flight;
      }
      return low;
    })
    let high = flightPrices.reduce((high, flight) =>{
      if(high < flight){
        high = flight;
      }
      return high;
    })
    let average = flightPrices.reduce((ave, flight) =>{
      ave += flight;
      return ave;
    }) / flightPrices.length
    let result = 
    {
      low: Number(low.toFixed(2)),
      average: Number(average.toFixed(2)),
      high: Number(high.toFixed(2)),
    }
    return result;
  }
  @Get('food/:city/:qualityId')
  async food(@Param('city') city, @Param('qualityId') qualityId){
    const response = await this.http.get(`http://www.numbeo.com:8008/api/city_prices?api_key=${config.AP_numbeo}&query=${city}`).toPromise()
    if (qualityId === '1'){
      let low = response.data.prices.filter(price => price.item_id === 1)[0].lowest_price;
      let mid = response.data.prices.filter(price => price.item_id === 1)[0].average_price;
      let high = response.data.prices.filter(price => price.item_id === 1)[0].highest_price;
      let lowFood ={
        low: Number(low.toFixed(2)),
        average: Number(mid.toFixed(2)),
        high: Number(high.toFixed(2)),
      }
      return lowFood;
    }
    if (qualityId === '2'){
      let low = response.data.prices.filter(price => price.item_id === 2)[0].lowest_price / 2;
      let mid = response.data.prices.filter(price => price.item_id === 2)[0].average_price / 2;
      let high = response.data.prices.filter(price => price.item_id === 2)[0].highest_price / 2;
      let midFood = {
        low: Number(low.toFixed(2)),
        average: Number(mid.toFixed(2)),
        high: Number(high.toFixed(2)),
      }
      return midFood;
    }
    if (qualityId === '3') {
      let low = response.data.prices.filter(price => price.item_id === 2)[0].lowest_price;
      let mid = response.data.prices.filter(price => price.item_id === 2)[0].average_price;
      let high = response.data.prices.filter(price => price.item_id === 2)[0].highest_price;
      let highFood = {
        low: Number(low.toFixed(2)),
        average: Number(mid.toFixed(2)),
        high: Number(high.toFixed(2)),
      }
      return highFood;
    }

  }
  @Get('gas/:origin/:destination/')
  async gas(@Param('origin') origin, @Param('destination') destination){
    const gasQuery = await this.http.get(`http://www.numbeo.com:8008/api/city_prices?api_key=${config.AP_numbeo}&query=${destination}`).toPromise()
    const gas = gasQuery.data.prices.filter(price => price.item_id === 24)[0].average_price * 3.78541;
    const distanceQuery = await this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${config.AP_google}`).toPromise()
    const distance = distanceQuery.data.rows[0].elements[0].distance.text
    const distancePrice = distance.replace(/\D+/g, '')
    const time = distanceQuery.data.rows[0].elements[0].duration.text

    const gasPrice ={
      gasPerGallon: gas,
      distance: distance,
      distancePrice: Number((((Number(distancePrice)) / 23.6) * gas).toFixed(2)),
      time: time
    }
    return gasPrice;
  }
    // gets all data from the prices table
  @Get()
  async findAll(): Promise<PricesEntity[]> {
    return this.PricesService.findAll();
  }
  
  // gets food prices from dummy data
  @Get('food')
  async findFood(): Promise<PricesEntity[]> {
    const low = Number((lasVegasData
    .prices
    .filter((food) => food.item_id === 1)[0]
      .lowest_price));

    const high = lasVegasData
      .prices
      .filter((food) => food.item_id === 1)[0]
      .highest_price;

    const average = (high + low) / 2;

    const food = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];
    return food;
  }
  // gets flight prices from dummy data
  @Get('flight')
  async findFlight(): Promise<PricesEntity[]> {
    const low = flightData[0]
    .data
    .reduce((low, flight) => {
      low = flight.price;
      if (low > flight.price) {
        low = flight.price;
      }
      return low;
    }, 0);

    const high = flightData[0]
      .data
      .reduce((high, flight) => {
        if (high <= flight.price) {
          high = flight.price;
        }
        return high;
      }, 0);

    const average = flightData[0]
      .data
      .reduce((average, flight) => {
        average += flight.price;

        return average;
      }, 0) / flightData[0].data.length;

    const flight = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];

    return flight;
  }

  @Get('hotel')
  async findHotel(): Promise<PricesEntity[]> {

    const prices = hotelsData.result
    .map((hotels) => {
      return hotels.min_total_price;
    }).filter(price => price < 1500 && price > 0);

    const low = (prices
    .reduce((low, hotel) => {
      if (low > hotel) {
        low = hotel;
      }
      return low;
    }));

    const high = prices
    .reduce((low, hotel) => {
      if (low < hotel) {
        low = hotel;
      }
      return low;
    });

    const average = (prices
    .reduce((low, hotel) => {
      low += hotel;
      return low;
    }, 0) / prices.length);

    const hotel = [low.toFixed(2), average.toFixed(2), high.toFixed(2)];

    return hotel;
  }

    // gets specific prices from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<PricesEntity> {
    return this.PricesService.read(id);
  }

  // posts data into prices table
  @Post('create')
  async create(@Body() pricesData: PricesEntity): Promise<any> {
    return this.PricesService.create(pricesData);
  }

    // updates data based on prices id
  @Put(':id/')
  async update(@Param('id') id, @Body() pricesData: PricesEntity): Promise<any> {
    pricesData.id = Number(id);
    console.log('Update #' + pricesData.id);
    return this.PricesService.update(pricesData);
  }

    // deletes data based on prices id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.PricesService.delete(id);
  }

}
