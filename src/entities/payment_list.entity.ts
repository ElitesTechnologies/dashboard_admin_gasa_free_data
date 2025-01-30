import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Offre } from './offre.entity';
import { Etudiant } from './student.entity';

@Entity({ name: 'payment', synchronize: false })
export class PaymentList {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  transaction_id: number;

  @Column()
  method: string;

  @Column()
  amount: number;

  @ManyToOne(() => Offre, { nullable: false })
  @JoinColumn({ name: 'id_offre' }) // Associe cette colonne comme clé étrangère
  id_offre: Offre;

  @ManyToOne(() => Etudiant, { nullable: false })
  @JoinColumn({ name: 'etudiant_id' }) // Nom de la colonne de clé étrangère
  etudiant_id: Etudiant; //

  @Column()
  date: Date;

  @Column()
  isSended: boolean;
}
