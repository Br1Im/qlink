import nodemailer from 'nodemailer';

interface SendEmailParams {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Настройка транспорта (используйте свои данные SMTP)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(params: SendEmailParams) {
    const { to, subject, text, html } = params;

    try {
      const info = await this.transporter.sendMail({
        from: `"Qlink" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to,
        subject,
        text,
        html: html || text,
      });

      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendTemplate(to: string, templateName: string, variables: Record<string, any>) {
    // Здесь можно загружать шаблоны из БД
    // Пока используем простую реализацию
    const templates: Record<string, { subject: string; body: string }> = {
      booking_confirmation: {
        subject: 'Подтверждение записи',
        body: 'Ваша запись подтверждена на {{date}} в {{time}}',
      },
      booking_reminder: {
        subject: 'Напоминание о записи',
        body: 'Напоминаем о вашей записи завтра в {{time}}',
      },
    };

    const template = templates[templateName];
    if (!template) {
      throw new Error(`Template ${templateName} not found`);
    }

    let { subject, body } = template;

    // Заменяем переменные
    Object.entries(variables).forEach(([key, value]) => {
      subject = subject.replace(`{{${key}}}`, value);
      body = body.replace(`{{${key}}}`, value);
    });

    return this.send({
      to,
      subject,
      text: body,
    });
  }
}

export const emailService = new EmailService();
