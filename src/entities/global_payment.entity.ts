import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'paiement_collectif', synchronize: false })
export class GlobalPayment {
  @PrimaryColumn()
  id_paiement: number;

  @Column()
  id_feda_transaction: number;

  @Column()
  date_paiement: Date;

  @Column()
  montant: number;

  @Column()
  id_admin_uatm: number;

  @Column()
  id_compte_uatm: number;

  @Column()
  id_compte_mtn: number;

  @Column()
  id_agent_mtn: number;
}
