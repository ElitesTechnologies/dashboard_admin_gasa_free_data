import { Module } from '@nestjs/common';
import { PaymentListService } from './payment_list.service';
import { PaymentListController } from './payment_list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentList } from 'src/entities/payment_list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PaymentList])],
  providers: [PaymentListService],
  controllers: [PaymentListController],
})
export class PaymentListModule {}
