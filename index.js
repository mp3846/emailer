import 'dotenv/config'
import { createTransport } from 'nodemailer'

const emailEnvs = {
	SENDER_EMAIL_USERNAME: process.env.SENDER_EMAIL_USERNAME,
	SENDER_APP_PASSWORD: process.env.SENDER_APP_PASSWORD,
	SENDER_EMAIL_ADDRESS: process.env.SENDER_EMAIL_ADDRESS,
	RECIEVER_EMAIL_ADDRESS: process.env.RECIEVER_EMAIL_ADDRESS
}

Object.keys(emailEnvs).forEach(
	(env) => !emailEnvs[env] && console.warn(`Environment variable ${env} is not set`)
)

const transporter = createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	html: true,
	secure: true,
	auth: {
		user: process.env.SENDER_EMAIL_USERNAME,
		pass: process.env.SENDER_APP_PASSWORD
	}
})

const sendEmail = (message, subject = '') => {
	const mailOptions = {
		from: `Mosi watcher <${process.env.SENDER_EMAIL_ADDRESS}>`,
		to: process.env.RECIEVER_EMAIL_ADDRESS,
		subject: subject || 'Notification from watcher',
		html: message
	}
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(`error: ${error}`, `\ninfo: ${info}`)
			return
		}
		console.log(`Email sent (content: ${message})`)
	})
}

export default sendEmail
