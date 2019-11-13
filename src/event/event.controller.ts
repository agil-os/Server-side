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
        return response.data._embedded.events.map(name => name.name)
    }

    @Post('create')
    async create(@Body() eventData: EventDto): Promise<any> {
        return this.EventService.create(eventData);
    }
}
