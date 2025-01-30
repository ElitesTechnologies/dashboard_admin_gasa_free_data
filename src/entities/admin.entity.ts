import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'admin_uatm', synchronize: false })
export class Admin {
  @PrimaryGeneratedColumn()
  id_admin_uatm: number;
  @Column()
  nom_admin: string;
  @Column()
  login: string;
  @Column()
  mot_de_passe: string;
  @Column()
  email_admin: string;
}
