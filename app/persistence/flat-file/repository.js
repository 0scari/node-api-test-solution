'use strict'

const CRUDError = require('../exception/crud-exception')

module.exports.getAllPosts = getAllPosts

module.exports.getPostById = (id) => {
    try {
        return getAllPosts().find(p => p.id === id)
    } catch (e) {
        throw new CRUDError('READ', e)
    }
}

module.exports.getPostsByTag = (tag) => {
    try {
        return getAllPosts().filter(p => p.tags.includes(tag))
    } catch (e) {
        throw new CRUDError('READ', e)
    }
}

// The requirements didn't specify that comments had to be linked to a specific post.
// Neither it's clear from the provided json structure how it should be linked to a specific post.
// So, just returning hardcoded value as per the 2.3 response example.
module.exports.getCommentsByPostId = getAllComments

function getAllPosts() {
    return require('./storage.json').posts
}

function getAllComments() {
    return require('./storage.json').comments
}
