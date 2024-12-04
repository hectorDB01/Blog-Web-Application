require('dotenv').config()
const knex = require('../database/connect')
const APIError = require('../utils/api-error')
const JSend = require('../utils/jsend')
const jwt = require('jsonwebtoken')
const moment = require('moment')

const getAllPosts = async (req, res, next) => {
    try {
        const posts = await knex('posts').select()
        return res.status(200).json(JSend.success({ posts }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const getPost = async (req, res, next) => {
    try {
        const postID = req.params.id
        const post = await knex('posts')
            .select("*")
            .from("posts")
            .where("id", postID)
        return res.status(200).json(JSend.success({ post }))
    } catch (error) {
        return next(new APIError(500, error.message))
    }
}

const getPostByCategory = async (req, res, next) => {
    try {
        const categoryID = req.params.categoryID
        const posts = await knex('posts')
            .select('*')
            .from("posts")
            .where("category_id", categoryID)
        return res.status(200).json(JSend.success({ posts }))
    } catch (error) {
        return next(new APIError(500, error.message))
    }
}

const getPostByUser = async (req, res, next) => {
    try {
        const userID = req.params.userID
        const posts = await knex('posts')
            .select('*')
            .from("posts")
            .where("category_id", userID)
        return res.status(200).json(JSend.success({ posts }))
    } catch (error) {
        return next(new APIError(500, error.message))
    }
}

const createPost = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken
        const decodedtoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const username = decodedtoken.name
        const user = await knex('users')
            .select('id')
            .where('username', username)
            .first()
        const timestamp = Date.now()
        const formattedDate = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        const categoryTitle = req.body.categoryTitle
        const category = await knex('categories')
            .select('id')
            .where('title', categoryTitle)
            .first()
        const post = {
            title: req.body.title,
            body: req.body.body,
            thumbnail: req.file ? `./public/thumbnails/${req.file.filename}` : null, // NEED HANDLING
            date_time: formattedDate,
            category_id: category.id,
            author_id: user.id,
            is_featured: req.body.is_featured
        }
        const [id] = await knex('posts').insert(post)
        return res.status(200).json(JSend.success({ id, ...post }))
    } catch (error) {
        console.log(error)
        return next(new APIError(500, error.message))
    }
}

const updatePost = async (req, res, next) => {
    try {
        const postID = req.params.id;
        const { title, body, is_featured } = req.body;
        let thumbnail = req.file ? req.file.filename : null;
        const existingPost = await knex("posts")
            .where("id", postID)
            .first();
        if (!existingPost) {
            return res.status(404).json(JSend.fail('Post not found'));
        }
        if (!thumbnail) {
            thumbnail = existingPost.thumbnail;
        }
        const formattedDate = moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
        const [updatedRows] = await knex("posts")
            .where("id", postID)
            .update({
                title,
                body,
                thumbnail,
                is_featured,
                date_time: formattedDate
            });
        if (updatedRows === 0) {
            return res.status(404).json(JSend.fail('Post not updated'));
        }
        const updatedPost = await knex("posts")
            .select("*")
            .where("id", postID)
            .first();
        return res.status(200).json(JSend.success({ updatedPost }));
    } catch (error) {
        console.error('Error updating post:', error);
        return next(new APIError(500, error.message));
    }
};

const deletePost = async (req, res, next) => {
    try {
        const postID = req.params.id;
        const post = await knex('posts')
            .select('id')
            .where('id', postID)
            .first();
        if (!post) {
            return res.status(404).json(JSend.fail({ message: 'Post not found' }));
        }
        const deletedPost = await knex('posts')
            .where('id', postID)
            .del();
        return res.status(200).json(JSend.success({ message: 'Post deleted successfully' }));
    } catch (error) {
        console.log(error);
        return next(new APIError(500, error.message));
    }
};

module.exports = {
    getAllPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostByCategory,
    getPostByUser
}