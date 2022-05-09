import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "543e523ad6375d",
      pass: "05d3a683ca52ba"
    }
  });

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData){
        await transport.sendMail({
        from: "Equipe Fidget <oi@fidget.com>",
        to: "Gabriel Vinicios <gabriel.oliv.f@gmail.com>",
        subject,
        html: body,
    })
    };
}