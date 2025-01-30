import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentList } from './payment_list.entity';

@Entity({ name: 'offre_internet', synchronize: false })
export class Offre {
  @PrimaryGeneratedColumn()
  id_offre: number;

  @Column()
  qte_data: string;

  @Column()
  prix_reduit: number;

  @Column()
  date_service: Date;

  @OneToMany(() => PaymentList, (payment) => payment.id_offre)
  payments: PaymentList[]; // Relation inverse vers les paiements associés
}
