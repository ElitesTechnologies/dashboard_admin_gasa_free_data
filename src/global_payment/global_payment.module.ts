import { Module } from '@nestjs/common';
import { GlobalPaymentService } from './global_payment.service';
import { GlobalPaymentController } from './global_payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GlobalPayment } from '../entities/global_payment.entity';
import { PaymentListService } from 'src/payment_list/payment_list.service';
import { PaymentList } from 'src/entities/payment_list.entity';
import { UsersService } from 'src/users/users.service';
import { EmailService } from 'src/email/email.service';
import { Etudiant } from 'src/entities/student.entity';
import { Admin } from 'src/entities/admin.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([GlobalPayment]),
    TypeOrmModule.forFeature([PaymentList]),
    TypeOrmModule.forFeature([Admin]),
  ],
  providers: [
    GlobalPaymentService,
    PaymentListService,
    UsersService,
    EmailService,
  ],
  controllers: [GlobalPaymentController],
})
export class GlobalPaymentModule {}
