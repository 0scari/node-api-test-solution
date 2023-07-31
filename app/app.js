'use strict'

const express = require('express')
const logger = require('morgan')

const appPort = process.env.PORT || 3000
const app = express()

app.use(express.static(__dirname + '/public'));
app.use(logger('dev'))
app.use(express.json())

app.use('/api', require('./web/rest/routes'))
app.use(require('./web/error-handler').errorHandler)

// This is a hack to fix the "routing" in index.html/js files. Not the best solution.
// Ideally, the client code would have a local router and wouldn't fire backend request for during navigation.
// As minimum the below '/.*/' regex pattern would be replaced with the known client app routes,
// but that's no good too because the backend shouldn't be aware of it.
app.get(/.*/, (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(appPort, () => {
  console.info(`Express app listening on port ${appPort}`)
})
