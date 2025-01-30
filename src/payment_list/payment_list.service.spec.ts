import { Test, TestingModule } from '@nestjs/testing';
import { PaymentListService } from './payment_list.service';

describe('PaymentListService', () => {
  let service: PaymentListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentListService],
    }).compile();

    service = module.get<PaymentListService>(PaymentListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
