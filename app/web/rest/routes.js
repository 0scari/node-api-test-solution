'use strict'

const router = require('express').Router()
const status = require('http-status-codes')
const repository = require('../../persistence/database').getRepository()

// I prefer to have business-logic service layer between controllers and DB repositories.
// But in this case there isn't any business logic really.

router.get('/posts', async(req, response, next) => {
    try {
        const data = repository.getAllPosts()
        response
          .status(status.OK)
          .send({ data })
    } catch (error) {
        return next(error);
    }
})

router.get('/posts/:id', async(req, response, next) => {
    try {
        const id = toId(req.params.id)
        if (!id) {
            sendError(response, status.BAD_REQUEST, 'Invalid ID format')
            return
        }

        const data = repository.getPostById(id)
        if (!data) {
            sendError(response, status.NOT_FOUND, `Post with ID:[${id}] doesn't exist`)
            return
        }
        response
          .status(status.OK)
          .send({data})
    } catch (error) {
        return next(error);
    }
})

router.get('/posts/:id/comments', async(req, response, next) => {
    try {
        const postId = toId(req.params.id)
        if (!postId) {
            sendError(response, status.BAD_REQUEST, 'Invalid ID format')
            return
        }

        const post = repository.getPostById(postId)
        if (!post) {
            sendError(response, status.NOT_FOUND, `Post with ID:[${postId}] doesn't exist`)
            return
        }

        const data = repository.getCommentsByPostId(postId)
        response
          .status(status.OK)
          .send({data})
    } catch (error) {
        return next(error);
    }
})

router.get('/tags/:name', async(req, response, next) => {
    try {
        const tag = req.params.name
        if (typeof tag !== 'string' || !tag.length) {
            sendError(response, status.BAD_REQUEST, 'Invalid tag name')
            return
        }

        const data = repository.getPostsByTag(req.params.name)
        response
          .status(status.OK)
          .send({data})
    } catch (error) {
        return next(error);
    }
})

function toId(id) {
    id = +id
    return isNaN(id) ? null : id
}

function sendError(response, status, detail) {
    response
      .status(status)
      .send({ "errors": [ { status, detail } ] })
}

module.exports = router

