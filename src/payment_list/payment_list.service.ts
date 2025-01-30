import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as fastcsv from 'fast-csv';
import { PaymentList } from 'src/entities/payment_list.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentListService {
  constructor(
    @InjectRepository(PaymentList)
    private readonly paymentListRepository: Repository<PaymentList>,
  ) {}

  private payment: PaymentList;
  paymentlist = [{}];

  async getAndCreateCsvList() {
    const payments = await this.paymentListRepository
      .createQueryBuilder('paiement')
      .leftJoinAndSelect('paiement.id_offre', 'offre_internet')
      .leftJoinAndSelect('paiement.etudiant_id', 'etudiant')
      .where('isSended= :status', { status: false })
      .getMany();
    //const filePath = path.resolve(__dirname, '../csv_listes/', 'paiement.csv');

    const documentsDir = path.join(process.cwd(), 'csv_listes');
    const filePath = path.join(documentsDir, 'paiement.csv');

    // Créer un fichier CSV
    const writableStream = fs.createWriteStream(filePath);

    // Créer un flux CSV et écrire les données
    const csvStream = fastcsv.format({ headers: true });

    csvStream.pipe(writableStream);

    // Ajouter chaque ligne du tableau des paiements dans le CSV
    payments.forEach((payment) => {
      csvStream.write({
        etudiant_id: payment.etudiant_id
          ? payment.etudiant_id.etudiant_id
          : 'Not Found',
        transaction_id: payment.transaction_id,
        amount: payment.amount,
        offre: payment.id_offre ? payment.id_offre.qte_data : 'Notfound',
        etudiant: payment.etudiant_id ? payment.etudiant_id.nom : 'Notfound',
        date: payment.date,
      });
    });

    // Terminer l'écriture du fichier CSV
    csvStream.end();

    this.updatePaymentSended();
  }

  async deletePaymentSended() {
    return await this.paymentListRepository.clear();
  }

  async updatePaymentSended() {
    return await this.paymentListRepository.update({}, { isSended: true });
  }

  async findAllPayment() {
    const payments = await this.paymentListRepository
      .createQueryBuilder('paiement')
      .leftJoinAndSelect('paiement.id_offre', 'offre_internet')
      .leftJoinAndSelect('paiement.etudiant_id', 'etudiant')
      .where('isSended= :status', { status: false })
      .getMany();
    this.paymentlist = [];
    payments.forEach((payment) => {
      this.paymentlist.push({
        id_demande: payment.id,
        nom: payment.etudiant_id.nom,
        prenom: payment.etudiant_id.prenom,
        data: payment.id_offre.qte_data,
        montant: payment.amount,
      });
    });
    return this.paymentlist;
  }

  async countPayment() {
    return await this.paymentListRepository.count();
  }

  async getTotalMontant(): Promise<number> {
    const result = await this.paymentListRepository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total') // Calcul de la somme
      .getRawOne(); // Récupération du résultat brut

    return result?.total ? parseFloat(result.total) : 0; // Retourne la somme ou 0
  }
}
