'use strict'

class CRUDError extends Error {
    constructor(operation) {
        super(operation + " error")
        this.name = 'CRUDError'
    }
}

module.exports = CRUDError
