import { Controller, Get } from '@nestjs/common';
import { PaymentListService } from './payment_list.service';

@Controller('payment-list')
export class PaymentListController {
  constructor(private readonly paymentListService: PaymentListService) {}

  @Get()
  getPayment() {
    return this.paymentListService.getAndCreateCsvList();
  }

  @Get('getall')
  getAllPayment() {
    return this.paymentListService.findAllPayment();
  }

  @Get('sum')
  getTotalPayment() {
    return this.paymentListService.getTotalMontant();
  }

  @Get('count')
  countPayment() {
    return this.paymentListService.countPayment();
  }
}
