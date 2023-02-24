import express, { ErrorRequestHandler, Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import Mail from './mail/mail';
import joi from 'joi'
import cors from 'cors'
const app: Express = express()
dotenv.config()
const PORT = process.env.PORT || 5001

function valid(req: Request, res: Response, next: NextFunction)
{
    const schemaValidation = joi.object({
        name: joi.string().required().messages({
          'string.empty': `Name field is empty!`
        }),
        email: joi.string().email().required().messages({
            'string.email': `Email isn't correct!`,
            'string.empty': `Email field is empty!`
        }),
        title: joi.string().required().messages({
            'string.empty': `Title field is empty!`
        }),
        text: joi.string().required().messages({
            'string.empty': `Content field is empty!`
        })
    })

    const {error} = schemaValidation.validate(req.body)
    if(error)
    {
        throw new Error(error.details[0].message)
    }
    else
    {
        next()
    }
}

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.post('/mail', valid, async (req: Request, res: Response, next: NextFunction) =>
{
    try
    {
        const mailer = new Mail(process.env.GOOGLELOGIN as string, process.env.GOOGLEPASSWORD as string, process.env.MYEMAIL as string)
        await mailer.send(req.body.email, req.body.title, req.body.text, req.body.name)
        res.status(200).send('Mail sent!')
    }
    catch(e)
    {
        throw new Error('Something went wrong! Try again')
    }
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => 
{
    res.status(500).send(err.message)
})

app.listen(PORT, () => 
  {
    console.log(`Server started on port ${PORT}`)
  })