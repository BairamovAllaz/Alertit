const nodeMailer = require("nodemailer");
const slackNotify = require("slack-notify");
const User = require("../../models/user");
const request = require("request");

class Communication {
	/**
	 *
	 * @param {String} from - Email from address.
	 * @param {String} to  - Email to address.
	 * @param {String} subject - Email subject.
	 * @param {String} html - Email body html.
	 */
	sendMail(SMTP_CONF, from, to, subject, html) {
		let transporter = nodeMailer.createTransport({
			host: SMTP_CONF.SMTP_HOST,
			port: SMTP_CONF.SMTP_PORT,
			secure: false,
			auth: {
				user: SMTP_CONF.SMTP_EMAIL,
				pass: SMTP_CONF.SMTP_PASSWORD,
			},
		});

		const mailOptions = {
			from: from,
			to: to,
			subject: subject,
			html: html,
		};

		try {
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				}

				console.log(`Message sent: ${info.messageId}`);
			});
		} catch (e) {
			console.log(e);
		}
	}

	/**
	 *
	 * @param {String} slack_webhook_url - webhook from the app that will forward message.
	 * @param {String} message - Message to send to slack server.
	 */
	sendSlack(slack_webhook_url, message) {
		const slack = slackNotify(slack_webhook_url);

		slack
			.send(message)
			.then(() => {
				console.log("done!");
			})
			.catch(err => {
				console.error(err);
			});
	}

	/**
	 *
	 * @param {String} customWebhookUrl - custom webhook url
	 */
	sendCustomWebhook(customWebhookUrl) {
		console.log(customWebhookUrl);

		const options = {
			method: "GET",
			url: customWebhookUrl,
			headers: {},
		};

		request(options, function (error, response) {
			if (error) throw new Error(error);
			console.log(response);
		});
	}

	/**
	 *
	 * @param {String} job - Monitor object
	 */
	async sendNotification(job) {
		try {
			const user = await User.findById(job.owner);

			const monitorName = job.name;
			const monitorUrl = job.url;
			const monitorType = job.monitorType;
			if (user) {
				const ownerEmail = user.email;

				const ownerEnableSlack = user.ENABLE_SLACK;
				if (ownerEnableSlack) {
					const ownerSlackWebhookUrl = user.SLACK_WEBHOOK_URL;
					const message = `Monitor - ${monitorName} is Down, check ${monitorUrl} !`;
					this.sendSlack(ownerSlackWebhookUrl, message);
				}

				const ownerEnableSMTP = user.ENABLE_SMTP;
				if (ownerEnableSMTP) {
					const ownerSmtpEmail = user.SMTP_EMAIL;
					const ownerSmtpHost = user.SMTP_HOST;
					const ownerSmtpPassword = user.SMTP_PASSWORD;
					const ownerSmtpPort = user.SMTP_PORT;

					const subject = `Monitor - ${monitorName} is Down`;
					const html = `
				<h1>${monitorName} is Down</h1>
				<p>Monitor type: ${monitorType}</p>

				<a href="${monitorUrl}">Visit monitor to check</a>
			`;

					this.sendMail(
						{
							SMTP_EMAIL: ownerSmtpEmail,
							SMTP_HOST: ownerSmtpHost,
							SMTP_PASSWORD: ownerSmtpPassword,
							SMTP_PORT: ownerSmtpPort,
						},
						ownerSmtpEmail,
						ownerEmail,
						subject,
						html
					);
				}

				const ownerEnableCustomWebhook = user.ENABLE_WEBHOOK;
				if (ownerEnableCustomWebhook) {
					const ownerCustomWebhookUrl = user.CUSTOM_WEBHOOK_URL;
					this.sendCustomWebhook(ownerCustomWebhookUrl);
				}
			}
		} catch (e) {
			console.log(e);
		}
	}
}
module.exports = Communication;
