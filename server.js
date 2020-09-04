const express = require('express')
const allowCrossDomain = require('./utils/allowCrossDomain')
const { router } = require('./router/jobpost_router')
const { errorHandler } = require('./utils/error')

const app = express()

app.response.sendStatus = function (statusCode, type, message) {
    return this.contentType(type)
      .status(statusCode)
      .send(message)
}

app.use(express.json())
app.use(allowCrossDomain)

app.listen(3001,'0.0.0.0',function() { console.log('Example app listening on port 4000!');});
app.use('',router)
app.use(errorHandler)