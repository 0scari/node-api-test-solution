'use strict'

const CRUDError = require('../persistence/exception/crud-exception')
const status = require("http-status-codes")

module.exports.errorHandler = (err, req, response, next) => {
    // useful for log alerts, ideally logs would need a timestamp
    if (err instanceof CRUDError) {
        console.error('Database operation error: ' + err.message, err)
    } else {
        console.error('Unknown error occurred', err)
    }

    response
      .status(status.INTERNAL_SERVER_ERROR)
      .send({
        "errors": [
          {
            status: status.INTERNAL_SERVER_ERROR,
            "detail": "Internal Server Error, contact support!" // always great to have some Correlation ID to add
          }
        ]
      })
}
