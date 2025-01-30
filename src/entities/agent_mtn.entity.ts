import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'agent_mtn', synchronize: false })
export class AgentMtn {
  @PrimaryGeneratedColumn()
  id_agent_mtn: number;

  @Column()
  email_agent: string;

  @Column()
  num_telephone: string;
}
