import { Injectable, Logger } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import * as path from 'path';
import * as fs from 'fs';
@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    sgMail.setApiKey(
      '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',
    );
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html: string,
    filePath: string,
  ): Promise<void> {
    const fileContent = fs.readFileSync(filePath).toString('base64');
    const fileName = path.basename(filePath);
    const mail = {
      to,
      from: 'ismaeliyanda@gmail.com',
      subject,
      text,
      html,
      attachments: [
        {
          content: fileContent,
          filename: fileName,
          type: 'text/csv',
          disposition: 'attachment',
        },
      ],
    };
    try {
      await sgMail.send(mail);
      this.logger.log(`Email to ${to}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}`, error.stack);
      throw error;
    }
  }
}
