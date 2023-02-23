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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mail_1 = __importDefault(require("./mail/mail"));
const joi_1 = __importDefault(require("joi"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 5001;
function valid(req, res, next) {
    const schemaValidation = joi_1.default.object({
        email: joi_1.default.string().email().required(),
        title: joi_1.default.string().required(),
        text: joi_1.default.string().required(),
        name: joi_1.default.string().required()
    });
    const { error } = schemaValidation.validate(req.body);
    if (error) {
        throw new Error('Data didnt pass validation!');
    }
    else {
        next();
    }
}
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.post('/mail', valid, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mailer = new mail_1.default(process.env.GOOGLELOGIN, process.env.GOOGLEPASSWORD, process.env.MYEMAIL);
        yield mailer.send(req.body.email, req.body.title, req.body.text, req.body.name);
        res.status(200).send('Mail sent!');
    }
    catch (_a) {
        throw new Error('Something went wrong! Try again');
    }
}));
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
});
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
