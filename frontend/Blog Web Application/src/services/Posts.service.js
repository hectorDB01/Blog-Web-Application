import axios from 'axios'

const makePostsService = () => {
  const baseURL = '/api/v1/post'

  const getPosts = async () => {
    let url = `${baseURL}`
    const result = await axios.get(url)
    return result.data.data
  }

  const getPost = async (id) => {
    let url = `${baseURL}/${id}`
    const result = await axios.get(url)
    return result.data.data
  }

  const createPost = async (post) => {
    let url = `${baseURL}/`
    const result = await axios.post(url, post)
    return result.data
  }

  const updatePost = async (id, post) => {
    let url = `${baseURL}/${id}`
    const result = await axios.put(url, post)
    return result.data.data
  }

  const deletePost = async (id) => {
    let url = `${baseURL}/${id}`
    const result = await axios.delete(url)
    return result.data
  }

  const getPostsByCategory = async (categoryID) => {
    let url = `${baseURL}/category/${categoryID}`
    const result = await axios.get(url)
    return result.data.data
  }

  const getPostsByUser = async (userID) => {
    let url = `${baseURL}/user/${userID}`
    const result = await axios.get(url)
    return result.data.data
  }

  return {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    getPostsByCategory,
    getPostsByUser,
  }
}

export default makePostsService()
