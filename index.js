import { createTransport } from 'nodemailer'
import * as dotenv from 'dotenv'

dotenv.config()

const transporter = createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
		user: process.env.SENDER_EMAIL_USERNAME,
		pass: process.env.SENDER_EMAIL_PASSWORD
	}
})

const sendEmail = (pair, price, orderType) => {
	const mailOptions = {
		from: `MP Trader <${process.env.SENDER_EMAIL_ADDRESS}>`,
		to: process.env.RECIEVER_EMAIL_ADDRESS,
		subject: 'Trade Alert',
		html: `<b>${pair}</b> crossed <b>${price}</b> so check it to <b>${orderType}</b>`
	}
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) return console.log(error)
		console.log('Email sent: ' + info.response)
	})
}

sendEmail('EURUSD', 1.23456, 'Sell')
