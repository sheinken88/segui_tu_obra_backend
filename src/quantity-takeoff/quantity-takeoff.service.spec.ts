import { Test, TestingModule } from '@nestjs/testing';
import { QuantityTakeoffService } from './quantity-takeoff.service';

describe('QuantityTakeoffService', () => {
  let service: QuantityTakeoffService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuantityTakeoffService],
    }).compile();

    service = module.get<QuantityTakeoffService>(QuantityTakeoffService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
