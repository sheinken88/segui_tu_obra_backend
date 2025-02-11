import { Test, TestingModule } from '@nestjs/testing';
import { QuantityTakeoffController } from './quantity-takeoff.controller';

describe('QuantityTakeoffController', () => {
  let controller: QuantityTakeoffController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuantityTakeoffController],
    }).compile();

    controller = module.get<QuantityTakeoffController>(QuantityTakeoffController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
