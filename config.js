
require('dotenv').config({ path: './.env' })
const { strictEqual } = require('assert')
strictEqual(typeof process.env.TLS_EMAIL, 'string')
strictEqual(typeof process.env.MAILGUN_API_KEY, 'string')
strictEqual(typeof process.env.MAIL_TO, 'string')
strictEqual(typeof process.env.EMAIL_DOMAIN, 'string')
strictEqual(typeof process.env.REACT_APP_API_KEY, 'string')

module.exports.config = {
  tlsEmail: process.env.TLS_EMAIL,
  domainName: process.env.EMAIL_DOMAIN,
  apiKey: process.env.MAILGUN_API_KEY,
  emailTo: process.env.MAIL_TO,
  clientKey: process.env.REACT_APP_API_KEY,
  emailProvider: 'mailgun'
}
