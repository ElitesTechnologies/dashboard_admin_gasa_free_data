import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FedaPay, Transaction } from 'fedapay';
import { GlobalPayment } from '../entities/global_payment.entity';
import { PaymentListService } from 'src/payment_list/payment_list.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GlobalPaymentService {
  constructor(
    @InjectRepository(GlobalPayment)
    private readonly globalPaymentRepository: Repository<GlobalPayment>,
    private readonly paymentListService: PaymentListService,
    private readonly userService: UsersService,
  ) {
    const FedaSecretKey = 'sk_sandbox_PN8ChO8jHOaQ1EBU5RF9WzDb';
    FedaPay.setApiKey(FedaSecretKey);
    FedaPay.setEnvironment('sandbox');
  }

  async getGlobalPayment(
    id: string,
    email: string,
    admin: number,
    compte_uatm: number,
    compte_mtn: number,
    agent_mtn: number,
  ) {
    const transaction = await Transaction.retrieve(id);

    if (transaction.status === 'approved') {
      const saveGlobalPayment = this.globalPaymentRepository.create({
        id_feda_transaction: transaction.id,
        date_paiement: new Date(transaction.created_at),
        montant: transaction.amount,
        id_admin_uatm: admin,
        id_compte_uatm: compte_uatm,
        id_compte_mtn: compte_mtn,
        id_agent_mtn: agent_mtn,
      });

      // Enregistrer dans la table paiemnt globale
      await this.globalPaymentRepository.save(saveGlobalPayment);

      //creer du fichier csv
      await this.paymentListService.getAndCreateCsvList();

      //envoi du mail
      await this.userService.sendWelcomeEmail(email);

      return saveGlobalPayment;
    } else {
      throw new Error('Transaction cannot be saved');
    }
  }

  async getTotalMontant(): Promise<number> {
    const result = await this.globalPaymentRepository
      .createQueryBuilder('payment_collectif')
      .select('SUM(payment_collectif.montant)', 'total') // Calcul de la somme
      .getRawOne(); // Récupération du résultat brut

    return result?.total ? parseFloat(result.total) : 0; // Retourne la somme ou 0
  }

  async getAll() {
    return this.globalPaymentRepository.find();
  }
}
