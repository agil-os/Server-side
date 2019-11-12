import { Controller, HttpService, Get, Param } from '@nestjs/common';
import { EventService } from './event.service';
import { EnvService } from '../env.service';


const config = new EnvService().read()

@Controller('event')
export class EventController {
    constructor(private readonly EventService: EventService,
                private readonly http: HttpService,
        ){}

    @Get(':country/:city/:startDate/:endDate')
    async findEvents(@Param('country') country: string, @Param('city') city: string, @Param('startDate') startDate: string, @Param('endDate') endDate: string) {
        const response = await this.http.get(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=${country}&city=${city}&startDateTime=${startDate}T14:00:00Z&endDateTime=${endDate}T14:00:00Z&apikey=${config.TM_api_key}`).toPromise()
        return response.data._embedded.events.map(name => name.name)
    }
}
