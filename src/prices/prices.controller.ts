import { Controller, Get, Post, Delete, Patch, Body, Param, Put, HttpService } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesEntity } from './prices.entity';
import { lasVegasData } from '../../sample_data/numbeo/lasVegas.js';
import { flightData } from '../../sample_data/Flights/flightData.js';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';
import { EnvModule } from '../env.module';
import { EnvService } from '../env.service';
import { CitiesEntity } from 'src/cities/cities.entity';
import { PricesDto } from './prices.dto';
import { doesNotReject } from 'assert';

const config = new EnvService().read();
@Controller('prices')
export class PricesController {
  constructor(private readonly PricesService: PricesService,
              private readonly http: HttpService,
    ) { }

  
  @Get('trips/:id')
  async tripPrice(@Param('id') id){
    const response = await this.http.get('http://localhost:3000/prices/').toPromise();
    return response.data.filter(price => price.trips.id === Number(id));
  }
  @Get('rental/:city/:arrival/:departure')
  async rental(@Param('city') city, @Param('arrival') arrival, @Param('departure') departure){
    const headerRequest = {
      'x-rapidapi-key': config.AK_Booking,
    }; 
    try {

      const response = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}`, { headers: headerRequest }).toPromise();
      
      console.log(`Able to retrieve ${city} ID for hotels`);
      const cityId = response.data[0].dest_id;
      try{

        const prices = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?search_type=city&offset=0&dest_ids=${cityId}&guest_qty=1&arrival_date=${arrival}&departure_date=${departure}&room_qty=1`, { headers: headerRequest }).toPromise()
        const rental = prices.data.result.map(address => address.address)[0]
        const splitCity = city.split(',')
        const rentalPrice = await this.http.get(`https://realtymole-rental-estimate-v1.p.rapidapi.com/rentalPrice?address=${rental},${splitCity[0]},${splitCity[1]}`, {headers: headerRequest}).toPromise();
        const date1 = new Date(arrival);
        const date2 = new Date(departure);
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

        const price =  rentalPrice.data.listings.map(cost => cost.price).sort((a, b) => a - b);
        
        const low = price[0];
        const lowType = rentalPrice.data.listings.filter(cost => cost.price === low)[0].propertyType;
        const lowPic = rentalPrice.data.listings.filter(cost => cost.price === low)[0].photo;
        const lowBed = rentalPrice.data.listings.filter(cost => cost.price === low)[0].bedrooms;

        const high = price[2];
        const highType = rentalPrice.data.listings.filter(cost => cost.price === high)[0].propertyType;
        const highPic = rentalPrice.data.listings.filter(cost => cost.price === high)[0].photo;
        const highBed = rentalPrice.data.listings.filter(cost => cost.price === high)[0].bedrooms;
        
        const average = (low + high) / 2;
        const result = {
          low: Number(((low / 30) * diffDays).toFixed(2)),
          average: Number(((average / 30) * diffDays).toFixed(2)),
          high: Number(((high / 30) * diffDays).toFixed(2)),
          detail: {
            lowShortRental: {
              type: lowType,
              picture: lowPic,
              bedrooms: lowBed,
            },
            highShortRental: {
              type: highType,
              picture: highPic,
              bedrooms: highBed
            }
          }
        };
        return result;
      } catch(err){
      console.log(`Could not retrieve ${city} hotel information`, err);
      }
      } catch(err){
      console.log(`Could not retrieve ${city} ID`, err);
      }
    }
  @Get('hotel/:qualityId/:city/:arrival/:departure')
  async root(@Param('city') city, @Param('arrival') arrival, @Param('departure') departure, @Param('qualityId') qualityId) {
    const headerRequest = {
      'x-rapidapi-key': config.AK_Booking,
    };
    
      // tslint:disable-next-line:max-line-length
      const response = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}`, {headers: headerRequest}).toPromise()
     try {
        console.log(`Able to retrieve ${city} ID for hotels`);
       const cityId = response.data[0].dest_id;
       const prices = await this.http.get(`https://apidojo-booking-v1.p.rapidapi.com/properties/list?search_type=city&offset=0&dest_ids=${cityId}&guest_qty=1&arrival_date=${arrival}&departure_date=${departure}&room_qty=1`, { headers: headerRequest }).toPromise()
      //  return prices.data.result
      //  .filter(type => type.booking_home.group === 'apartment_like');       
       try {
        console.log(`Able to retrieve ${city} hotel information`);
        const date1 = new Date(arrival);
        const date2 = new Date(departure);
        const diffTime = Math.abs(date2.getTime() - date1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        let quality;
         const lowQuality = [prices.data.result.filter(type => type.booking_home.group === 'hotels_and_others').map(hotel => hotel.min_total_price).sort((a, b) => a - b).filter(num => num > 0)[0], 
           prices.data.result.filter(type => type.booking_home.group === 'hotels_and_others').map(hotel => hotel.min_total_price).sort((a, b) => a - b).filter(num => num > 0)[1], 
           prices.data.result.filter(type => type.booking_home.group === 'hotels_and_others').map(hotel => hotel.min_total_price).sort((a, b) => a - b).filter(num => num > 0)[2]]
        // prices.data.result.map(hotel => hotel.min_total_price).filter(price => price < 107 * diffDays && price > 0);
         const midQuality = [prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[Math.round((prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0).length - 1) / 2)], 
         prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[Math.round((prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0).length - 1) / 2) + 1],
         prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[Math.round((prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0).length - 1) / 2) + 2]]
        // prices.data.result.map(hotel => hotel.min_total_price).filter(price => price > 107 * diffDays && price < 143 * diffDays);
         const highQuality = [
           prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[(prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)).length - 3], 
           prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[(prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)).length - 2], 
           prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)[(prices.data.result.map(hotel => hotel.min_total_price).sort((a,b) => a - b).filter(num => num > 0)).length - 1] 
          ]
        // prices.data.result.map(hotel => hotel.min_total_price).filter(price => price > 143 * diffDays);
        
            if (qualityId === '1'){
              quality = lowQuality;
            }
            if (qualityId === '2') {
              quality = midQuality;
            }
            if (qualityId === '3') {
              quality = highQuality;
            }
        
              const low = quality[0]
              // .reduce((low, hotel) => {
              //   if (low > hotel) {
              //     low = hotel;
              //   }
              //   return low;
              // }); 
            const lowName = prices.data.result.filter(name => name.min_total_price === low)[0].hotel_name_trans;
            const lowAccom = prices.data.result.filter(name => name.min_total_price === low)[0].accommodation_type_name;
            const lowBusinessScore = prices.data.result.filter(name => name.min_total_price === low)[0].business_review_score_word;
            const lowUrl = prices.data.result.filter(name => name.min_total_price === low)[0].url;
        
        
            const high = quality[quality.length - 1]
            // .reduce((high, hotel) => {
            //     if (high < hotel) {
            //       high = hotel;
            //     }
            //     return high;
            //   });
            
            const highName = prices.data.result.filter(name => name.min_total_price === high)[0].hotel_name_trans;
            const highAccom = prices.data.result.filter(name => name.min_total_price === high)[0].accommodation_type_name;
            const highBusinessScore = prices.data.result.filter(name => name.min_total_price === high)[0].business_review_score_word;
            const highUrl = prices.data.result.filter(name => name.min_total_price === high)[0].url;
        
              const average = quality.reduce((ave, hotel) => {
                ave += hotel;
                return ave;
              }) / quality.length;
        
              const result = {
                low: Number(low.toFixed(2)),
                average: Number(average.toFixed(2)),
                high: Number(high.toFixed(2)),
                detail: {
                  lowHotel: {
                    name: lowName,
                    accomodationType: lowAccom,
                    businessScore: lowBusinessScore,
                    URL: lowUrl
                  },
                  highHotel: {
                    name: highName,
                    accomodationType: highAccom,
                    businessScore: highBusinessScore,
                    URL: highUrl
                  }
                }
              };
              return result;
      }
      catch (err) {
        console.log(`Could not retrieve ${city} hotel information`, err);
      }

      }
      catch (err) {
        console.log(`Could not retrieve ${city} ID`, err);
      }
    

    
    // tslint:disable-next-line:max-line-length
  }

  @Get('flight/:qualityId/:flyFrom/:flyTo/:dateFrom/')
  async flightPrices(@Param('flyFrom') flyFrom, @Param('flyTo') flyTo, @Param('dateFrom') dateFrom, @Param('qualityId') qualityId) {
    // tslint:disable-next-line:max-line-length
    let classes = '';
    let cabinClass ='';
    if (qualityId === '1') {
      classes = 'e';
      cabinClass = 'Economy'
    }
    if (qualityId === '2') {
      classes = 'b';
      cabinClass = 'Business'
    }
    if (qualityId === '3') {
      classes = 'f';
      cabinClass = 'First Class'
    }
    const headerRequest = {
      'x-rapidapi-key': config.AK_Kayak,
    };
    // tslint:disable-next-line:max-line-length
    try {
      const origin = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${flyFrom}`, { headers: headerRequest }).toPromise();
      const originCode = origin.data[0].searchFormPrimary;
      const destination = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${flyTo}`, { headers: headerRequest }).toPromise();
      const destinationCode = destination.data[0].searchFormPrimary;
      const response = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/flights/create-session?origin1=${originCode}&destination1=${destinationCode}&departdate1=${dateFrom}&cabin=${classes}&currency=USD&adults=1&bags=0`, { headers: headerRequest }).toPromise();
      const flights = response.data;
      const flightPrices = flights.tripset.map(price => price.exactLow).filter(num => num > 0).sort((a, b) => a - b);
      // const nameAir = response.data.tripset.map(name => name.exactLow).filter(num => num > 0).sort();
      const low = flightPrices[0];
      const lowAirline = flights.tripset.filter(num => num.exactLow === low)[0].cheapestProviderName;
      const lowOrigin = flights.tripset.filter(num => num.exactLow === low)[0].flightRoutes[0].originAirport;
      const lowDestination = flights.tripset.filter(num => num.exactLow === low)[0].flightRoutes[0].destinationAirport;
      const lowStops = flights.tripset.filter(num => num.exactLow === low)[0].maxstops;
      const lowURL = flights.tripset.filter(num => num.exactLow === low)[0].shareURL;
  
  
  
      // .map(name => name.cheapestProviderName)
  
      const high = flightPrices[Math.round((flightPrices.length - 1) / 2)];
      const highAirline = flights.tripset.filter(num => num.exactLow === high)[0].cheapestProviderName;
      const highOrigin = flights.tripset.filter(num => num.exactLow === high)[0].flightRoutes[0].originAirport;
      const highDestination = flights.tripset.filter(num => num.exactLow === high)[0].flightRoutes[0].destinationAirport;
      const highStops = flights.tripset.filter(num => num.exactLow === high)[0].maxstops;
      const highURL = flights.tripset.filter(num => num.exactLow === high)[0].shareURL;
  
      const average = (low + high)/2
      // flightPrices.reduce((ave, flight) => {
      //   ave += flight;
      //   return ave;
      // }) / flightPrices.length
      let result = 
      {
        low: Number(low.toFixed(2)),
        average: Number(average.toFixed(2)),
        high: Number(high.toFixed(2)),
        detail: {
          lowFlight: {
            airline: lowAirline,
            stops: lowStops,
            cabin: cabinClass,
            flightPath: {
              origin: lowOrigin,
              destination: lowDestination,
            },
            URL: `https://www.kayak.com${lowURL}`
          },
          highFlight: {
            airline: highAirline,
            stops: highStops,
            cabin: cabinClass,
            flightPath: {
              origin: highOrigin,
              destination: highDestination,
            },
            URL: `https://www.kayak.com${highURL}`
          } 
      }
      }
  
      return result;
    }
    catch (err) {
      console.log(`Could not retrieve ${flyFrom} to ${flyTo} flight information`, err);
    }

    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:max-line-length
    // console.log(response);

  }
  @Get('food/:city/:qualityId')
  async food(@Param('city') city, @Param('qualityId') qualityId){
    try {
      const response = await this.http.get(`http://www.numbeo.com:8008/api/city_prices?api_key=${config.AP_numbeo}&query=${city}`).toPromise()
      if (qualityId === '1'){
        const low = response.data.prices.filter(price => price.item_id === 1)[0].lowest_price;
        const mid = response.data.prices.filter(price => price.item_id === 1)[0].average_price;
        const high = response.data.prices.filter(price => price.item_id === 1)[0].highest_price;
        const lowFood ={
          low: Number(low.toFixed(2)),
          average: Number(mid.toFixed(2)),
          high: Number(high.toFixed(2)),
        };
        return lowFood;
      }
      if (qualityId === '2'){
        const low = response.data.prices.filter(price => price.item_id === 2)[0].lowest_price / 2;
        const mid = response.data.prices.filter(price => price.item_id === 2)[0].average_price / 2;
        const high = response.data.prices.filter(price => price.item_id === 2)[0].highest_price / 2;
        const midFood = {
          low: Number(low.toFixed(2)),
          average: Number(mid.toFixed(2)),
          high: Number(high.toFixed(2)),
        }
        return midFood;
      }
      if (qualityId === '3') {
        const low = response.data.prices.filter(price => price.item_id === 2)[0].lowest_price;
        const mid = response.data.prices.filter(price => price.item_id === 2)[0].average_price;
        const high = response.data.prices.filter(price => price.item_id === 2)[0].highest_price;
        const highFood = {
          low: Number(low.toFixed(2)),
          average: Number(mid.toFixed(2)),
          high: Number(high.toFixed(2)),
        }
        return highFood;
      }
    }
    catch (err) {
      console.log(`Could not retrieve ${city} food prices`, err);
    }

  }
  @Get('cars/:origin/:pickup/:dropoff')
  async findCarPrices(@Param('origin') origin, @Param('pickup') pickup, @Param('dropoff') dropoff, @Param('qualityId') qualityId) {
    const headerRequest = {
      'x-rapidapi-key': config.AK_Kayak,
    };
    // tslint:disable-next-line:max-line-length
    try {
      const city = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/locations/search?where=${origin}`, { headers: headerRequest }).toPromise();
      const cityCode = city.data[0].searchFormPrimary;
      // tslint:disable-next-line:max-line-length
      const rentalCars = await this.http.get(`https://apidojo-kayak-v1.p.rapidapi.com/cars/create-session?originairportcode=${cityCode}&pickupdate=${pickup}&pickuphour=6&dropoffdate=${dropoff}&dropoffhour=6&currency=USD`, { headers: headerRequest }).toPromise();
      const car = rentalCars.data.carset;
  
      const carPrices = car.map(rental => Number(rental.displayFullPrice.replace(/\D+/g, ''))).sort((a, b) => a - b);
      const lowPrice = carPrices[0];
      const highPrice = carPrices[carPrices.length - 1];
      const averagePrice = carPrices.reduce((avg, flight) => {
        avg += flight;
        return avg;
      }) / carPrices.length;
      const lowBasePrice = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].totalPrice
      const lowbrand = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].car.brand
      const lowCarClass = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].car.carclass
      const lowPicture = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].car.thumbLarge
      const lowPassenger = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].car.passengers
      const lowURL = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === lowPrice)[0].shareURL
  
  
      const highBasePrice = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].totalPrice
      const highbrand = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].car.brand
      const highCarClass = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].car.carclass
      const highPicture = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].car.thumbLarge
      const highPassenger = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].car.passengers
      const highURL = car.filter(rental => Number(rental.displayFullPrice.replace(/\D+/g, '')) === highPrice)[0].shareURL
  
  
      const result = {
        low: Number(lowPrice.toFixed(2)),
        average: Number(averagePrice.toFixed(2)),
        high: Number(highPrice.toFixed(2)),
        detail: {
          lowRental: {
            pricePerDay: lowBasePrice,
            brand: lowbrand,
            carClass: lowCarClass,
            passengers: lowPassenger,
            picture: `https://www.kayak.com${lowPicture}`,
            url: `https://www.kayak.com${lowURL}`
          },
          highRental: {
            pricePerDay: highBasePrice,
            brand: highbrand,
            carClass: highCarClass,
            passengers: highPassenger,
            picture: `https://www.kayak.com${highPicture}`,
            url: `https://www.kayak.com${highURL}`
          }
        }
      };
      
  
      return result;

    }
    catch (err) {
      console.log(`Could not retrieve ${origin} car information`, err)
    }
  }
  @Get('gas/:origin/:destination/')
  async gas(@Param('origin') origin, @Param('destination') destination) {
    try {
      const gasQuery = await this.http.get(`http://www.numbeo.com:8008/api/city_prices?api_key=${config.AP_numbeo}&query=${destination}`).toPromise();
      const gas = gasQuery.data.prices.filter(price => price.item_id === 24)[0].average_price * 3.78541;
      // tslint:disable-next-line:max-line-length
      const distanceQuery = await this.http.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${config.AP_google}`).toPromise();
      const distance = distanceQuery.data.rows[0].elements[0].distance.text;
      const distancePrice = distance.replace(/\D+/g, '');
      const time = distanceQuery.data.rows[0].elements[0].duration.text;
  
      const gasPrice = {
        gasPerGallon: gas,
        distance,
        distancePrice: Number((((Number(distancePrice)) / 23.6) * gas).toFixed(2)),
        time,
      };
      return gasPrice;
    }
    catch (err) {
      console.log(`Could not find ${origin} to ${destination} gas information`, err);
    }

  }
    // gets all data from the prices table
  @Get()
  async findAll(): Promise<PricesEntity[]> {
    return this.PricesService.findAll();
  }
    // gets specific prices from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<PricesEntity> {
    return this.PricesService.read(id);
  }

  // posts data into prices table
  @Post('create')
  async create(@Body() pricesData: PricesDto): Promise<any> {
    return this.PricesService.create(pricesData);
  }

  //   // updates data based on prices id
  // @Put(':id/')
  // async update(@Param('id') id, @Body() pricesData: PricesEntity): Promise<any> {
  //   pricesData.id = Number(id);
  //   console.log('Update #' + pricesData.id);
  //   return this.PricesService.update(pricesData);
  // }

  //   // deletes data based on prices id
  // @Delete(':id/')
  // async delete(@Param('id') id): Promise<any> {
  //   return this.PricesService.delete(id);
  // }

}
