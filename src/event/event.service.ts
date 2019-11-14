import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './event.entity';
import { Repository } from 'typeorm';
import { EventDto } from './event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntity)
    private eventRepository: Repository<EventEntity>,
  ) {}

  async findEvent(): Promise<EventEntity[]> {
    return await this.eventRepository.find();
  }

  async create(eventDto: EventDto): Promise<EventEntity> {
    const { id, name, price, picture, link } = eventDto;
    const event = new EventEntity();
    event.id = id;
    event.name = name;
    event.price = price;
    event.picture = picture;
    event.link = link;
    await event.save();
    return event;
  }
}
