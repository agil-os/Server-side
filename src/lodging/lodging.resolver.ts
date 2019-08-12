import { Resolver, Query } from '@nestjs/graphql';
import { hotelsData } from '../../sample_data/Booking/hotelsInfo.js';

@Resolver()
export class LodgingResolver {
  // constructor(
  //   private readonly authorsService: AuthorsService,
  //   private readonly postsService: PostsService,
  // ) { }

  @Query(() => String)
  async hello() {
    return 'Yoooo';
  }

  @Query(() => Object)
  async hotelSample() {
    return hotelsData;
  }

  // @ResolveProperty()
  // async posts(@Parent() author) {
  //   const { id } = author;
  //   return await this.postsService.findAll({ authorId: id });
  // }
}