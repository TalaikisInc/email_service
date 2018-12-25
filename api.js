import express from 'express'
import { sendEmail } from './email'
import { config } from './config'
const app = express()
require('@babel/polyfill')
require('dotenv').config({ path: './.env' })

app.use(require('compression')())
app.use(require('body-parser').json())

app.use(require('cors')())

app.post('/contactus', (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email : false
  const msg = typeof req.body.msg === 'string' ? req.body.msg : false
  const name = typeof req.body.name === 'string' ? req.body.name : false
  const validKey = req.body.key ? req.body.key === config.clientKey : false
  if (email && msg && name && validKey) {
    const subject = `Message from identiForm: ${name}`
    sendEmail(email, subject, msg, (err) => {
      res.setHeader('Content-Type', 'application/json')
      if (!err.error) {
        res.end(JSON.stringify({ status: 'sent' }))
      } else {
        res.end(JSON.stringify({ status: 'error' }))
      }
    })
  } else {
    res.end(JSON.stringify({ status: 'error' }))
  }
})

app.get('/ping', (req, res) => {
  res.send('OK')
})

const PORT = process.env.NODE_ENV === 'production' ? process.env.PORT : 3086
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.log(err)
  }
  console.info(`==> listening on http://localhost:${PORT}.`)
})
