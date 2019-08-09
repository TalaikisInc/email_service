# Simple Mail API Service

## Features

* Contact us microservice (on Mailgun)
* Checks if email exists
* Internationalized

## Quick start with Docker

```bash
# Edit .env and ports on start.sh
./build.sh
./start.sh

# On reload:
./reload.sh
```

## Sample request

```js
import { post } from 'axios'

const contactApi = (name, email, message, done) => {
  const locale = 'en'
  const CONTACT_API_KEY = ''
  const CONTACT_API_URL = ''

  post(CONTACT_API_URL, {
    method: 'POST',
    msg: message,
    key: CONTACT_API_KEY,
    locale,
    name,
    email,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((data) => {
      done(null, data.data)
    })
    .catch((err) => {
      done({ error: err.message })
    })
}
```

## API Responses

```json
{ "status": "sent" } // if email is sent successfully
{ "status": "<some error>" } // if some error occurs
```
