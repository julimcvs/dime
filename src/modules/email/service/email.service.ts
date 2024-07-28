import { Injectable } from '@nestjs/common';
const nodemailer = require('nodemailer');

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  async sendEmail(html: string, subject: string, to: string) {
    return await this.transporter.sendMail({
      subject,
      to: [to],
      html,
    });
  }
}
