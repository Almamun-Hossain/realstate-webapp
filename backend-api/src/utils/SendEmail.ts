import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import variables from "../config/variables";
import { readFileSync } from "fs";
import CustomError from "../ErrorHandler/customError";
import httpStatus from "http-status";
import { renderResetPasswordTemplate } from "./MailTemplate";

class SendEmail {
  private transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: variables.mail.service,
      host: variables.mail.host,
      port: variables.mail.port,
      auth: {
        user: variables.mail.username,
        pass: variables.mail.password
      },
      from: `"Urban Nest"<${variables.mail.fromAddress}>`
    });
  }

  async send(options: SendMailOptions): Promise<void> {
    try {
      await this.transporter.sendMail(options);
    } catch (error) {
      throw new CustomError("Unable to send email, Please try again later", httpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async sendResetPasswordEmail(email: string, token: string): Promise<void> {
    let url = `http://localhost:3000/reset-password/${token}`;
    let renderHtml = renderResetPasswordTemplate(email, url);
    let options = {
      to: email,
      subject: `Reset password request for ${email}`,
      html: renderHtml
    } satisfies SendMailOptions;
    await this.send(options);
  }
}

export default SendEmail;
