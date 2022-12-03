const nodemailer = require('nodemailer');

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			// host: process.env.HOST,
			service: process.env.SERVICE,
			// port: Number(process.env.EMAIL_PORT),
			// secure: process.env.SECURE,
			auth: {
				user: process.env.USER,
				pass: process.env.PASS,
			},
			tls: {
				rejectUnauthorized: false,
			},
		});

		await transporter.sendMail({
			from: process.env.USER,
			to: email,
			subject: subject,
			html: text,
		});

		console.log('email send successfully');
	} catch (error) {
		console.log(error);
		console.log('email not send');
	}
};
