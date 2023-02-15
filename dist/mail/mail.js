"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
class Mail {
    constructor(googleLogin, googlePassword, myEmail) {
        this.googleLogin = googleLogin;
        this.googlePassword = googlePassword;
        this.myEmail = myEmail;
    }
    send(email, title, text, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transporter = nodemailer_1.default.createTransport({
                    service: "Gmail",
                    port: 587,
                    secure: false,
                    auth: {
                        user: this.googleLogin,
                        pass: this.googlePassword,
                    }
                });
                yield transporter.sendMail({
                    from: email,
                    to: this.myEmail,
                    subject: title,
                    text: `${email} ${name} ${text}`,
                    html: `<h1>E-mail: ${email}</h1> <h1>Name: ${name}</h1> ${text}`
                });
            }
            catch (_a) {
                throw new Error();
            }
        });
    }
}
exports.default = Mail;
