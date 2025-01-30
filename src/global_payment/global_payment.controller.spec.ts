import { Test, TestingModule } from '@nestjs/testing';
import { GlobalPaymentController } from './global_payment.controller';

describe('GlobalPaymentController', () => {
  let controller: GlobalPaymentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlobalPaymentController],
    }).compile();

    controller = module.get<GlobalPaymentController>(GlobalPaymentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
