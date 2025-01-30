// src/user/user.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailService } from '../email/email.service';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Etudiant } from 'src/entities/student.entity';
import { Repository } from 'typeorm';
import { Admin } from 'src/entities/admin.entity';
import { AdminDto } from 'src/DTOs/admin.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(
    private readonly emailService: EmailService,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  private admin: AdminDto;

  async sendWelcomeEmail(userEmail: string): Promise<void> {
    const subject = "Liste d'offre de data";
    const text = 'Voici le point des demandes';
    const html = '<strong>UATM GASA-FORMATION</strong>';

    //const filePath='./csv_listes/paiement.csv';
    const documentsDir = path.join(process.cwd(), 'csv_listes');
    const filePath = path.join(documentsDir, 'paiement.csv');

    await this.emailService.sendEmail(userEmail, subject, text, html, filePath);
  }

  async CreateAdmin(adminDto: AdminDto): Promise<AdminDto> {
    const login = adminDto.login;
    const email_admin = adminDto.email_admin;
    const password = adminDto.mot_de_passe;
    const loginExist = await this.adminRepository.findOne({ where: { login } });
    const emailExist = await this.adminRepository.findOne({
      where: { email_admin },
    });
    if (loginExist || emailExist) {
      throw new BadRequestException(
        'Le login et le email sont uniques à chaque administrateur',
      );
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    this.admin = {
      nom_admin: adminDto.nom_admin,
      login,
      mot_de_passe: passwordHash,
      email_admin,
    };

    const saveAdmin = await this.adminRepository.save(this.admin);
    return saveAdmin;
  }

  async validateAdmin(login: string, mot_de_passe: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { login } });
    if (!admin) {
      throw new UnauthorizedException('Login ou mot de passe incorrect');
    } else {
      console.log(login, mot_de_passe);
    }

    // Vérification du mot de passe (haché ou non)
    const isPasswordValid = await bcrypt.compare(
      mot_de_passe,
      admin.mot_de_passe,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('mot de passe incorrect');
    }

    return admin;
  }

  async findAll() {
    return this.adminRepository.find();
  }

  async findOne(id_admin_uatm: number): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id_admin_uatm },
    });
    if (admin) {
      return admin;
    } else {
      throw new NotFoundException('Not Found');
    }
  }
}
