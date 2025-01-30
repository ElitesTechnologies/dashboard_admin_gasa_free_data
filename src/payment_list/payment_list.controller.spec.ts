import { Test, TestingModule } from '@nestjs/testing';
import { PaymentListController } from './payment_list.controller';

describe('PaymentListController', () => {
  let controller: PaymentListController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentListController],
    }).compile();

    controller = module.get<PaymentListController>(PaymentListController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
