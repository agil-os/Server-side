import { Controller, HttpService, Get, Param, Post, Body } from '@nestjs/common';
import { EventService } from './event.service';
import { EnvService } from '../env.service';
import { EventDto } from './event.dto';


const config = new EnvService().read()

@Controller('event')
export class EventController {
    constructor(private readonly EventService: EventService,
                private readonly http: HttpService,
        ){}

    @Get(':city/:startDate/:endDate')
    async findEvents(@Param('country') country: string, @Param('city') city: string, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
        const response = await this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&city=${city}&startDateTime=${startDate}T14:00:00Z&endDateTime=${endDate}T14:00:00Z&apikey=${config.TM_api_key}`).toPromise()
        const details = response.data._embedded.events
        const name = details.map(name => name.name)
        const pic = details.map(pic => pic.images[1].url)
        const link = details.map(link => link.url)
        const date = details.map(date => date.dates.start.localDate)
        const priceMin = details.map(price => price.priceRanges).filter(ele => Array.isArray(ele)).map(min => min[0].min)
        const priceMax = details.map(price => price.priceRanges).filter(ele => Array.isArray(ele)).map(max => max[0].max)
        // const description = details.map(desc => )
        const result = {
            name: name,
            pic: pic,
            link: link,
            date: date,
            priceMin: priceMin,
            priceMax: priceMax
        }
        return result
        // return details
    }

    @Post('create')
    async create(@Body() eventData: EventDto): Promise<any> {
        return this.EventService.create(eventData);
    }
}
