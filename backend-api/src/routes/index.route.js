const express = require('express')
const indexController = require('../controllers/index.controller')
const manipulateToken = require('../utils/manipulateToken')
const userController = require('../controllers/users.controller');

const router = express.Router()

module.exports.setup = (app) => {
    app.use('/auth', router)
    
    router.post('/main',  manipulateToken.authenticateToken, (req, res) => {
        return res.json({
            message: 'Accessed successfully!!!',
            data: req.user // ???
        })
    })

    /** 
     * @swagger
     * /auth/login:
     *  post:
     *    summary: login into web blog
     *    description: login into web blog
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/loginInfo'
     *    tags:
     *      - login
     *    responses:
     *      200:
     *        description: login successfully
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
     *                    token:
     *                      $ref: '#/components/schemas/Token'
     */
    router.post("/login", indexController.loginUser)

    /**
     * @swagger
     * /auth/logout:
     *   post:
     *     summary: Logout
     *     description: Delete refreshToken of user
     *     tags:
     *       - logout
     *     responses:
     *       200:
     *         description: Logout successfully
     *         $ref: '#/components/responses/200NoData'
     */
    router.post("/logout", indexController.logoutUser)

    router.post("/signup", userController.createUser)

    router.post("/refresh", indexController.generateNewToken)
}