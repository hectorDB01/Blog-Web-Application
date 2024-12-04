const express = require('express');
const categoriesController = require('../controllers/categories.controller')
const { methodNotAllowed } = require('../controllers/errors.controller')
const manipulateToken = require('../utils/manipulateToken')

const router = express.Router();

module.exports.setup = (app) => {
    app.use("/api/v1/category", router)
    
    /** 
     * @swagger
     * /api/v1/category:
     *  get:
     *    security:
     *      - bearerAuth: []
     *    summary: Get all categories
     *    description: Get all categories
     *    tags:
     *      - categories
     *    responses:
     *      200:
     *        description: Get All of categories
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
     *                    categories:
     *                      type: array
     *                      items:
     *                        $ref: '#/components/schemas/Category'
     *                      metadata:
     *                        $ref: '#/components/schemas/PaginationMetadata'
     */ 
    router.get("/", categoriesController.getAllCategories)
}