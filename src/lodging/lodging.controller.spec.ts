import { Test, TestingModule } from '@nestjs/testing';
import { LodgingController } from './lodging.controller';

describe('Lodging Controller', () => {
  let controller: LodgingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LodgingController],
    }).compile();

    controller = module.get<LodgingController>(LodgingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
