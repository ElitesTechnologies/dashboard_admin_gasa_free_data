import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './email/email.module';
import { UsersModule } from './users/users.module';
import { GlobalPaymentModule } from './global_payment/global_payment.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { PaymentListModule } from './payment_list/payment_list.module';
import { PaymentList } from './entities/payment_list.entity';
import { Offre } from './entities/offre.entity';
import { Etudiant } from './entities/student.entity';
import { Admin } from './entities/admin.entity';
import { GlobalPayment } from './entities/global_payment.entity';
import { AgentMtn } from './entities/agent_mtn.entity';
import { CompteUatm } from './entities/compte_uatm.entity';
import { RessourcesModule } from './ressources/ressources.module';
import { CompteMtn } from './entities/compte_mtn.entity';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables d'environnement globales
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',

      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT, 10) || 3306,
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'gasa_free_data.sql',
      entities: [
        PaymentList,
        Offre,
        Etudiant,
        Admin,
        GlobalPayment,
        AgentMtn,
        CompteUatm,
        CompteMtn,
      ],
      synchronize: false,
    }),
    EmailModule,
    UsersModule,
    GlobalPaymentModule,
    PaymentListModule,
    RessourcesModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
