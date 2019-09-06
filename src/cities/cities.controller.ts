import { Controller, Get, Post, Delete, Patch, Body, Put, Param, HttpService } from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CitiesEntity } from './cities.entity';
import { nolaKajakData } from '../../sample_data/Kajak/nolaCode.js';
import { newOrleansData } from '../../sample_data/numbeo/newOrleans.js';
import { lasVegasData } from '../../sample_data/numbeo/lasVegas.js';
import { cityInfo } from '../../sample_data/Teleport/teleportGETcityinfo.js';
import { EnvModule } from '../env.module';
import { EnvService } from '../env.service';

const config = new EnvService().read();
@Controller('cities')
export class CitiesController {
  constructor(private readonly CitiesService: CitiesService,
              private readonly http: HttpService,
    ) { }

  @Get('picture/:city')
  async pic(@Param('city') city) {
    if (city === 'San Francisco') {
      city = 'San Francisco Bay Area';
    }
    const response = await this.http.get('https://api.teleport.org/api/urban_areas/').toPromise();
    const ref = response.data._links['ua:item'].filter(name => name.name === city)[0].href;
    const picQuerry = await this.http.get(`${ref}images/`).toPromise();
    // return ref;
    return JSON.stringify(picQuerry.data.photos[0].image.web);
  }
    // gets all data from the cities table
  @Get()
  async findAll(): Promise<CitiesEntity[]> {
    return this.CitiesService.findAll();
  }
  @Get('origin')
  async findOrigin(): Promise<CitiesEntity[]> {
    const code = newOrleansData.city_id;
    const name = newOrleansData.name;
    const lat = nolaKajakData[0].lat;
    const lon = nolaKajakData[0].lat;
    return [code, name, lat, lon];
    // return lat;
  }
  @Get('destination')
  async findDest(): Promise<CitiesEntity[]> {
    const code = lasVegasData.city_id;
    const name = lasVegasData.name;
    const lat = cityInfo.location.latlon.latitude;
    const lon = cityInfo.location.latlon.longitude;
    return [code, name, lat, lon];
  }
    // gets specific cities from table based on id
  @Get(':id')
  async read(@Param('id') id): Promise<CitiesEntity> {
    return this.CitiesService.read(id);
  }

    // posts data into cities table
  @Post('create')
  async create(@Body() citiesData: CitiesEntity): Promise<any> {
    return this.CitiesService.create(citiesData);
  }

    // updates data based on cities id
  @Put(':id/')
  async update(@Param('id') id, @Body() citiesData: CitiesEntity): Promise<any> {
    citiesData.id = Number(id);
    console.log('Update #' + citiesData.id);
    return this.CitiesService.update(citiesData);
  }

    // deletes data based on cities id
  @Delete(':id/')
  async delete(@Param('id') id): Promise<any> {
    return this.CitiesService.delete(id);
  }

}
