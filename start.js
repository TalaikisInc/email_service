require('core-js/stable')
require('@babel/register')({
  presets: [
    '@babel/preset-env'
  ]
})

module.exports = require('./api.js')
