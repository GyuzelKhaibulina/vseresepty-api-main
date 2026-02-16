import nodemailer from 'nodemailer';

class SendGmail {
    #transporter = null;
    constructor() {
        this.#transporter = this.#getTransporter();
    }

    #getTransporter () {
        return nodemailer.createTransport({
            host:'smtp.gmail.com',
            port: 465,
            secure: true,
            logger: true,
            debug: true,
            secureConnection: false,
            auth: {
                 user: 'vsrecepti@gmail.com',
                 pass: '',  // this password must be generated from google account https://support.google.com/mail/answer/185833?hl=ru 
            },
            tls: {
                rejectUnauthorized: true
            }
        })
    }
    async send (reciever, message, subject, html) {
        try {
            const info = await this.#transporter.sendMail ({
                from: "ВсеРецепты",
                to: reciever,
                subject: subject,
                text: message,
                html: html,
            })
            return info.messageId
        }
        catch (e) {
            return e
        }
    }
}

export default new SendGmail;
