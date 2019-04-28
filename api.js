import express from 'express'
import legit from 'legit'

import { sendEmail } from './email'
import { config } from './config'
import { t, setLocale } from './translations'
const app = express()
require('dotenv').config({ path: './.env' })

app.use(require('compression')())
app.use(require('body-parser').json())
app.use(require('cors')())

app.post('/contactus', (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email : false
  const msg = typeof req.body.msg === 'string' ? req.body.msg : false
  const name = typeof req.body.name === 'string' ? req.body.name : false
  const locale = typeof req.body.locale === 'string' ? req.body.locale : 'en'
  const validKey = req.body.key ? req.body.key === config.clientKey : false
  if (validKey) {
    if (locale !== 'en') {
      setLocale(locale)
    }

    if (email && msg && name) {
      legit(email).then((response) => {
          if (response.isValid) {
            const subject = `Message from: ${name}`
            sendEmail(email, subject, msg, (err) => {
              res.setHeader('Content-Type', 'application/json')
              if (!err.error) {
                res.end(JSON.stringify({ status: 'sent' }))
              } else {
                res.end(JSON.stringify({ status: t('send_error', { error: err.error }) }))
              }
            })
          } else {
            res.end(JSON.stringify({ status: t('email_error') }))
          }
        }).catch((err) => {
          res.end(JSON.stringify({ status: t('email_check_error', { error: err.message }) }))
        })
    } else {
      res.end(JSON.stringify({ status: t('error_required') }))
    }
  } else {
    res.end(JSON.stringify({ status: t('unauthorized') }))
  }
})

app.get('/ping', (req, res) => {
  res.send('OK')
})

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3000
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`==> listening on http://localhost:${PORT}.`)
})
