require('dotenv').config()
const jwt = require("jsonwebtoken")
const JSend = require('../utils/jsend')

function isTokenExpired(token) {
    const { exp } = jwt.decode(token)
    console.log("exp: " + exp)
    return Date.now() >= exp * 1000
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401).json(JSend.fail({message: 'Token is null' }))
    // console.log("Check: " + isTokenExpired(token))
    if(!isTokenExpired(token)) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(403).json(JSend.fail({message: err.message}))
            req.user = user
            next()
        })
    } else {
        return res.status(403).json(JSend.fail({message: 'Token is expired'}))
    }

    
}

module.exports = {
    authenticateToken,
    isTokenExpired
}