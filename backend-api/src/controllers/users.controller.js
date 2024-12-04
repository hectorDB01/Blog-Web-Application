require('dotenv').config()
const knex = require("../database/connect")
const APIError = require('../utils/api-error');
const JSend = require('../utils/jsend');
const argon2 = require('argon2')
// const jwt = require('jsonwebtoken')

const createUser = async (req, res, next) => {
    try {
        const hashedPassword = await argon2.hash(req.body.password, {type: argon2.argon2i})
        const user = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            avatar: req.file ? `/public/avatars/${req.file.filename}`: null, // NEED 
        }
        const createdUser = await knex('users').insert(user)
        return res.status(200).json(JSend.success({ createdUser: user }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await knex('users').select()
        return res.status(200).json(JSend.success({ users }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const getUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        const users = await knex('users')
            .select("*")
            .where("id", userID)
            .first()
        return res.status(200).json(JSend.success({ users }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        const { first_name, last_name, email} = req.body
        const users = await knex("users")
            .where("id", userID)
            .update({
                first_name: first_name,
                last_name: last_name,
                email: email
            })
        const updatedUser = await knex("users")
            .select("*")
            .where("id", userID)
            .first()
        return res.status(200).json(JSend.success({ updatedUser }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userID = req.params.id
        const users = await knex("users")
        .where({"id": userID}).del()
        return res.status(200).json(JSend.success({ users }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const changePassword = async (req, res, next) => {
    try {
        const hashedNewPassword = await argon2.hash(req.body.newPassword, {type: argon2.argon2i})
        const username = req.cookies.accessToken
        const user = await knex('users')
                .select('id', 'password')
                .where('username', username)
                .first()
        if(await argon2.verify(user.password, req.body.oldPassword)) {
            const changedUser = await knex("users")
                .where("id", user.id)
                .update("password", hashedNewPassword)
            return res.json(JSend.success({}))
        } else {
            return res.json(JSend.fail({}))
        }
    } catch (error) {
        return next(new APIError(505, "Fail to change password"))
    }
}

module.exports = {
    getAllUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword
};