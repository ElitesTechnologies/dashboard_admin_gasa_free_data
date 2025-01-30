import { Controller, Param, Get } from '@nestjs/common';
import { GlobalPaymentService } from './global_payment.service';

@Controller('global-payment')
export class GlobalPaymentController {
  constructor(private readonly globalPaymentService: GlobalPaymentService) {}

  @Get('/fedapay/:id/:email/:admin/:uatm/:id_compte_mtn/:id_agent_mtn')
  getFedaPaymentAndSave(
    @Param('id') id: string,
    @Param('email') email: string,
    @Param('admin') admin: number,
    @Param('uatm') compte_uatm: number,
    @Param('id_compte_mtn') compte_mtn: number,
    @Param('id_agent_mtn') agent_mtn: number,
  ) {
    const payment = this.globalPaymentService.getGlobalPayment(
      id,
      email,
      admin,
      compte_uatm,
      compte_mtn,
      agent_mtn,
    );

    return payment;
  }

  @Get('sum')
  getTotalPayment() {
    return this.globalPaymentService.getTotalMontant();
  }

  @Get('getall')
  getAll() {
    return this.globalPaymentService.getAll();
  }
}
