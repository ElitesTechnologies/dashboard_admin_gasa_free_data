import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'compte_momo_uatm', synchronize: false })
export class CompteUatm {
  @PrimaryGeneratedColumn()
  id_compte_uatm: number;

  @Column()
  num_momo_uatm: string;

  @Column()
  nom_uatm: string;
}
