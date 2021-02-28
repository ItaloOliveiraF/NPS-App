import nodemailer, { Transporter } from 'nodemailer';
import fs from 'fs';
import handlebars from 'handlebars';

class SendEmailService {
    private client:Transporter
    
    constructor(){
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            this.client = transporter;
        })
    }

    async execute(to: string, subject: string, variables: object, path: string){
        
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const mailTemplateParse = handlebars.compile(templateFileContent);

        const html = mailTemplateParse(variables)

        const message = {
            from: 'NPS <noreply@nps.com>',
            to,
            subject,
            html
        };

        const info = await this.client.sendMail(message);

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}

export default new SendEmailService()