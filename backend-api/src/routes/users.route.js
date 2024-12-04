const express = require('express');
const userController = require('../controllers/users.controller');
const manipulateToken = require('../utils/manipulateToken')
const avatarUpload = require('../middlewares/avatar_upload.middleware');
const { methodNotAllowed } = require('../controllers/errors.controller');

const router = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/user", router)

     /** 
     * @swagger
     * /api/v1/user:
     *  get:
     *    security:
     *      - bearerAuth: []
     *    summary: Get all users
     *    description: Get all users
     *    tags:
     *      - users
     *    responses:
     *      200:
     *        description: Get all of users
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
     *                    users:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/User'
     *                      metadata:
     *                        $ref: '#/components/schemas/PaginationMetadata'
     */ 
    router.get("/", userController.getAllUsers)

    /** 
     * @swagger
     * /api/v1/user:
     *  post:
     *    security:
     *      - bearerAuth: []
     *    summary: Create a user
     *    description: Create a user
     *    requestBody:
     *      required: true
     *      content:
     *        multipart/form-data:
     *          schema:
     *            $ref: '#/components/schemas/Post'
     *    tags:
     *      - users
     *    responses:
     *      201:
     *        description: Create a user
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
     *                    user:
     *                      $ref: '#/components/schemas/User'
     */ 
    router.post("/", avatarUpload, userController.createUser)

    /**
     * @swagger
     * /api/v1/user/{id}:
     *   get:
     *     security:
     *      - bearerAuth: []
     *     summary: Get user by ID
     *     description: Get user by ID
     *     parameters: 
     *       - $ref: '#/components/parameters/userIdParam'
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: A user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 status:
     *                   type: string
     *                   description: The response status
     *                   enum: [success]
     *                 data:
     *                   type: object
     *                   properties:
     *                     user:
     *                       $ref: '#/components/schemas/User' 
     */
    router.get("/:id", userController.getUser)

    /**
     * @swagger
     * /api/v1/user/{id}:
     *   put:
     *     security:
     *      - bearerAuth: []
     *     summary: Update user by ID
     *     description: Update user by ID
     *     parameters:
     *       - $ref: '#/components/parameters/userIdParam'
     *     requestBody:
     *       required: true
     *       content: 
     *         multipart/form-data:
     *           schema:
     *             $ref: '#/components/schemas/User'
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: An updated user
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties: 
     *                 status:
     *                   type: string
     *                   description: The response status
     *                   enum: [success]
     *                 data:
     *                   type: object
     *                   properties:
     *                     user:
     *                       $ref: '#/components/schemas/User'
     */
    router.put("/:id", userController.updateUser)

    /**
     * @swagger
     * /api/v1/user/{id}:
     *   delete:
     *     security:
     *      - bearerAuth: []
     *     summary: Delete user by ID
     *     description: Delete a user by their ID
     *     parameters: 
     *       - $ref: '#/components/parameters/userIdParam'
     *     tags:
     *       - users
     *     responses:
     *       200:
     *         description: User deleted successfully
     *         $ref: '#/components/responses/200NoData'
     */
    router.delete("/:id", userController.deleteUser)

    router.patch("/changePassword", userController.changePassword)
}