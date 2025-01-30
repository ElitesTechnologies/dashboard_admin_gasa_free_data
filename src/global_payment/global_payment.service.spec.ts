import { Test, TestingModule } from '@nestjs/testing';
import { GlobalPaymentService } from './global_payment.service';

describe('GlobalPaymentService', () => {
  let service: GlobalPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalPaymentService],
    }).compile();

    service = module.get<GlobalPaymentService>(GlobalPaymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
