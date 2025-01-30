import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'compte_momo_mtn', synchronize: false })
export class CompteMtn {
  @PrimaryGeneratedColumn()
  id_compte_mtn: number;

  @Column()
  numero_momo_mtn: string;
}
