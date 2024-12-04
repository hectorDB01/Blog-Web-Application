const express = require('express');
const postsController = require('../controllers/posts.controller')
const manipulateToken = require('../utils/manipulateToken')
const thumbnailUpload = require('../middlewares/thumbnail_upload.middleware')
const { methodNotAllowed } = require('../controllers/errors.controller')

const router = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/post", router)
    
     /** 
     * @swagger
     * /api/v1/post:
     *  get:
     *    security:
     *      - bearerAuth: []
     *    summary: Get all posts
     *    description: Get all posts
     *    tags:
     *      - posts
     *    responses:
     *      '200':
     *        description: Get all of posts
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties: 
     *                    posts:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Post'
     *                      metadata:
     *                        $ref: '#/components/schemas/PaginationMetadata'
     */ 
    router.get("/", postsController.getAllPosts)

    /** 
     * @swagger
     * /api/v1/post:
     *  post:
     *    summary: Create a post
     *    description: Create a post
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            $ref: '#/components/schemas/Post'
     *    tags:
     *      - posts
     *    responses:
     *      201:
     *        description: Create a post
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties: 
     *                    post:
     *                      $ref: '#/components/schemas/Post'
     */ 
    router.post("/", thumbnailUpload, postsController.createPost)
    // .all(methodNotAllowed)

    /** 
     * @swagger
     * /api/v1/post/{id}:
     *  get:
     *    security:
     *      - bearerAuth: []
     *    summary: Get post By Id
     *    description: Get post By Id
     *    parameters:
     *      - $ref: '#/components/parameters/postIdParam'
     *    tags:
     *      - posts
     *    responses:
     *      200:
     *        description: Get post By Id
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties: 
     *                    category:
     *                        $ref: '#/components/schemas/Post'
     */ 
    router.get("/:id", postsController.getPost)

     /** 
     * @swagger
     * /api/v1/post/{id}:
     *  put:
     *    security:
     *      - bearerAuth: []
     *    summary: Update post By Id
     *    description: Update post By Id
     *    parameters:
     *      - $ref: '#/components/parameters/postIdParam'
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            $ref: '#/components/schemas/Post'
     *    tags:
     *      - posts
     *    responses:
     *      201:
     *        description: An updated Post
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                status:
     *                  type: string
     *                  description: The response status
     *                  enum: [success]
     *                data:
     *                  type: object
     *                  properties: 
     *                    category:
     *                        $ref: '#/components/schemas/Post'
     */ 
    router.put('/:id', postsController.updatePost)

    /** 
     * @swagger
     * /api/v1/post/{id}:
     *  delete:
     *    security:
     *      - bearerAuth: []
     *    summary: Delete post By Id
     *    description: Delete post By Id
     *    parameters:
     *      - $ref: '#/components/parameters/postIdParam'
     *    tags:
     *      - posts
     *    responses:
     *      201:
     *        description: Delete post By Id
     *        $ref: '#/components/schemas/Post'
     */ 
    router.delete('/:id', postsController.deletePost)
    // .all(methodNotAllowed)

    router.get('/category/:categoryID', postsController.getPostByCategory)

    router.get('/user/:userID', postsController.getPostByUser)
}