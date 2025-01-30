import { Module } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { RessourcesController } from './ressources.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompteUatm } from 'src/entities/compte_uatm.entity';
import { AgentMtn } from 'src/entities/agent_mtn.entity';
import { CompteMtn } from 'src/entities/compte_mtn.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompteUatm]),
    TypeOrmModule.forFeature([AgentMtn]),
    TypeOrmModule.forFeature([CompteMtn]),
  ],
  providers: [RessourcesService],
  controllers: [RessourcesController],
})
export class RessourcesModule {}
