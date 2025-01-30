import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompteMtnDto } from 'src/DTOs/compte_mtn.dto';
import { CompteUatmDto } from 'src/DTOs/compte_uatm.dto';
import { AgentMtn } from 'src/entities/agent_mtn.entity';
import { CompteMtn } from 'src/entities/compte_mtn.entity';
import { CompteUatm } from 'src/entities/compte_uatm.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RessourcesService {
  constructor(
    @InjectRepository(CompteUatm)
    private readonly compteUatmRepository: Repository<CompteUatm>,

    @InjectRepository(AgentMtn)
    private readonly agentMtnRepository: Repository<AgentMtn>,

    @InjectRepository(CompteMtn)
    private readonly compteMtnRepository: Repository<CompteMtn>,
  ) {}

  async getCompte() {
    return await this.compteUatmRepository.find();
  }

  async getAgent() {
    return await this.agentMtnRepository.find();
  }

  async getCompteMtn() {
    return await this.compteMtnRepository.find();
  }

  async findOneAgent(id_agent_mtn) {
    const agent = this.agentMtnRepository.findOne({ where: { id_agent_mtn } });
    return {
      email: (await agent).email_agent,
      id_agent_mtn: (await agent).id_agent_mtn,
    };
  }

  async saveCompteUatm(compteDto: CompteUatmDto) {
    return this.compteUatmRepository.save(compteDto);
  }

  async saveCompteMtn(compteDto: CompteMtnDto) {
    return this.compteMtnRepository.save(compteDto);
  }

  async updateCompteMtn(
    id_compte_mtn: number,
    compteDto: CompteMtnDto,
  ): Promise<void> {
    const mtn_compte = await this.compteMtnRepository.findOne({
      where: { id_compte_mtn },
    });
    if (mtn_compte) {
      this.compteMtnRepository.update({ id_compte_mtn }, compteDto);
    }
  }

  async updateCompteUatm(
    id_compte_uatm: number,
    compteDto: CompteUatmDto,
  ): Promise<void> {
    const mtn_compte = await this.compteUatmRepository.findOne({
      where: { id_compte_uatm },
    });
    if (mtn_compte) {
      this.compteUatmRepository.update({ id_compte_uatm }, compteDto);
    }
  }
}
