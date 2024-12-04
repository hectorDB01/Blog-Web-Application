import axios from 'axios'

const makeUsersService = () => {
  const baseURL = '/api/v1/user'

  const getUsers = async () => {
    let url = `${baseURL}`
    const result = await axios.get(url)
    return result.data.data
  }

  const getUser = async (id) => {
    let url = `${baseURL}/${id}`
    const result = await axios.get(url)
    return result.data.data
  }

  const createUser = async (user) => {
    let url = `${baseURL}`
    const result = await axios.post(url, user)
    return result.data.data
  }

  const updateUser = async (id, user) => {
    let url = `${baseURL}/${id}`
    const result = await axios.put(url, user)
    return result.data.data
  }

  const deleteUser = async (id) => {
    let url = `${baseURL}/${id}`
    const result = await axios.delete(url)
    return result.data.data
  }

  // ??????????????????????????????
  const changePassword = async () => {
    let url = `${baseURL}`
    const result = await axios.get(url)
    return result.data.data
  }

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
  }
}

export default makeUsersService()
