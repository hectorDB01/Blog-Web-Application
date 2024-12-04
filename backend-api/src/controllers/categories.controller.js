const knex = require('../database/connect')
const JSend = require('../utils/jsend')
const APIError = require('../utils/api-error')


const getAllCategories = async (req, res, next) => {
    try {
        const categories = await knex("categories").select()
        return res.status(200).json(JSend.success({ categories }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

module.exports = {
    getAllCategories
}