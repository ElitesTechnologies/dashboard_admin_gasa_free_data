import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { RessourcesService } from './ressources.service';
import { CompteUatmDto } from 'src/DTOs/compte_uatm.dto';
import { CompteMtnDto } from 'src/DTOs/compte_mtn.dto';
import { CompteMtn } from 'src/entities/compte_mtn.entity';

@Controller('ressources')
export class RessourcesController {
  constructor(private readonly ressourcesServices: RessourcesService) {}

  @Get('compteuatm')
  getAllCompte() {
    return this.ressourcesServices.getCompte();
  }

  @Get('agentmtn')
  getAllAgent() {
    return this.ressourcesServices.getAgent();
  }

  @Get('comptemtn')
  get() {
    return this.ressourcesServices.getCompteMtn();
  }

  @Get(':id_agent')
  getOneAgent(@Param('id_agent') id_agent: number) {
    return this.ressourcesServices.findOneAgent(id_agent);
  }

  @Post('compteuatm')
  saveCompteUatm(@Body() compte: CompteUatmDto) {
    return this.ressourcesServices.saveCompteUatm(compte);
  }

  @Post('comptemtn')
  saveCompteMtn(@Body() compte: CompteMtnDto) {
    return this.ressourcesServices.saveCompteMtn(compte);
  }

  @Put('update/mtn/:id')
  upadteMtnCompte(@Param('id') id: number, @Body() updateData: CompteMtnDto) {
    return this.ressourcesServices.updateCompteMtn(id, updateData);
  }

  @Put('update/uatm/:id')
  upadteuatmCompte(@Param('id') id: number, @Body() updateData: CompteUatmDto) {
    return this.ressourcesServices.updateCompteUatm(id, updateData);
  }
}
