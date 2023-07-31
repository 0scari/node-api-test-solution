'use strict'

// The persistence layer config to work as proxy to set the repository and change it in a single place
// if the DB changes to something else. Typescript's interface would be great to define the repository methods.

// Also, if it were a real database then the 'connect' method would be here.

const repository = require('./flat-file/repository');
module.exports.getRepository = () => repository
