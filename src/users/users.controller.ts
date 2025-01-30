// src/user/user.controller.ts
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { AdminDto } from 'src/DTOs/admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('sendmail/:email')
  async sendWelcomeEmail(@Param('email') email: string): Promise<void> {
    await this.userService.sendWelcomeEmail(email);
  }

  @Post('/registeradmin')
  async createUser(@Body() adminDto: AdminDto): Promise<void> {
    await this.userService.CreateAdmin(adminDto);
  }

  @Post('login')
  async login(@Body() body: { login: string; mot_de_passe: string }) {
    const admin = await this.userService.validateAdmin(
      body.login,
      body.mot_de_passe,
    );
    return {
      message: 'Connexion réussie',
      admin: {
        id: admin.id_admin_uatm,
        nom: admin.nom_admin,
        email: admin.email_admin,
      },
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }
}
