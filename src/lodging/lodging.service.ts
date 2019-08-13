import { Injectable } from '@nestjs/common';
import { HttpService, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { map } from 'rxjs/operators';
import axios from 'axios';

@Injectable()
export class LodgingService {
  constructor(private http: HttpService) {}

  getHotels(city, arrival, departure): Promise<any> {
    const options = {
      url: `https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete?text=${city}`,
      headers: {
        'X-Rapidapi-Key': 'dcac924cd5msh0b8c9cab19c8fb8p1300f1jsnd46bbad37f2d',
      },
    };
    return axios(options)
    .then(response => {
      console.log(response.data[0].dest_id);
      const cityId = response.data[0].dest_id;
      return cityId;
    }).then(cityId => {
      // tslint:disable-next-line:max-line-length
      const newOption = {
        // tslint:disable-next-line:max-line-length
        url: `https://apidojo-booking-v1.p.rapidapi.com/properties/list?search_type=city&offset=0&dest_ids=${cityId}&guest_qty=1&arrival_date=${arrival}&departure_date=${departure}&room_qty=1`,
        headers: {
          'X-Rapidapi-Key': 'dcac924cd5msh0b8c9cab19c8fb8p1300f1jsnd46bbad37f2d',
        },
      };
      return axios(newOption)
      .then(response => {
        return response.data;
      });
    });
  }

}
