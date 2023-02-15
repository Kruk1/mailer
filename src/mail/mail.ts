import mailer from 'nodemailer'
import { emit } from 'process';

export default class Mail
{
    googleLogin: string;
    googlePassword: string;
    myEmail: string;

    constructor(googleLogin: string, googlePassword: string, myEmail: string)
    {
        this.googleLogin = googleLogin
        this.googlePassword = googlePassword
        this.myEmail = myEmail
    }

    async send(email: string, title: string, text: string, name: string)
    {
        try
        {
            const transporter = mailer.createTransport(
                {
                    service: "Gmail",
                    port: 587,
                    secure: false,
                    auth:  
                    {
                      user: this.googleLogin,
                      pass: this.googlePassword,
                    }
                }
            )
    
            await transporter.sendMail({
                from: email, 
                to: this.myEmail, 
                subject: title,
                text: `${email} ${name} ${text}`,
                html: `<h1>E-mail: ${email}</h1> <h1>Name: ${name}</h1> ${text}`
            })
        }
        catch
        {
            throw new Error()
        }
    }
}