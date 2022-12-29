import axios from "axios";
interface MailArgs {
  code?: string;
  name?: string;
  deviceName?: string;
}

class MailService {
  public host: string;

  constructor(mailServiceHost: string | undefined) {
    if (!mailServiceHost) {
      this.host = "";
      return process.exit(1);
    }
    this.host = mailServiceHost;
  }

  async sendVerificationEmail(to: string, lang: string, args: MailArgs) {
    const res = await axios.post(
      `${this.host}/api/v1/verify-email`,
      {
        to,
        lang,
        ...args,
      }
    );
    return res;
  }
}

export const mailService = new MailService(process.env.MAIL_SERVICE_HOST);
