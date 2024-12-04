require('dotenv').config()
const knex = require("../database/connect")
const APIError = require('../utils/api-error')
const JSend = require('../utils/jsend')
const argon2 = require('argon2')
const jwt = require('jsonwebtoken')

const accessCookieOptions = {
  httpOnly: true,
  secure: false,
  maxAge: 60 * 60 * 24,
};

const refreshCookieOptions = {
  ...accessCookieOptions,
  maxAge: 60 * 60 * 1000,
};

function createTokens(user) {
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    return {
        accessToken,
        refreshToken
    }
}

const loginUser = async (req, res, next) => {
    if(!req.body.username || !req.body.password) return next(new APIError(401, "Missing username or password"));
    try {
        const username = req.body.username
        const hashedPasswordObj = await knex('users').select('password').where('username', username).first()
        if(await argon2.verify(hashedPasswordObj.password, req.body.password)) {
            const user = {username: username}
            const { accessToken, refreshToken} = createTokens(user)
            res.cookie("accessToken", accessToken, accessCookieOptions)
            res.cookie("refreshToken", refreshToken, refreshCookieOptions)
            return res.status(200).json(JSend.success({}))
        } else {
            return next(new APIError(401, "Password Incorrect !!!"))
        }
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const logoutUser = (req, res) => {
    if(!req.cookies.accessToken || !req.cookies.refreshToken) {
        return res.status(200).json(JSend.fail({
            message: 'No accessToken and refreshToken in cookie'
        }))
    }
    return res
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .status(200).json(JSend.success({
            message: 'Log out successfully'
        }))
}

const generateNewToken = (req, res, next) => {
    const refreshToken = req.cookies ? req.cookies.refreshToken : null
    if (!refreshToken) {return next(new APIError(401, "Refresh token expired or does not exist"))}
    try {
        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
        if (err) return res.status(403)
        const accessToken =  jwt.sign(decoded.user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" })
        res.cookie("accessToken", accessToken, accessCookieOptions)
        return res.status(200).json(JSend.success({}))
    } catch (error) {
        return next(new APIError(500, error.message));
    }
}

module.exports = {
    loginUser,
    logoutUser,
    generateNewToken
};