import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentList } from './payment_list.entity';

@Entity({ name: 'etudiant', synchronize: false })
export class Etudiant {
  @PrimaryGeneratedColumn()
  etudiant_id: number;

  @Column()
  login: string;

  @Column()
  mot_de_passe: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  numero_personnel: number;

  @OneToMany(() => PaymentList, (payment) => payment.etudiant_id)
  payments: PaymentList[];
}
