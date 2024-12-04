import axios from 'axios'

const makeCategoriesService = () => {
  const getCategories = async () => {
    const result = await axios.get('/api/v1/category')
    console.log('resolve: ' + result.data)
    return result.data.data
  }

  const getCategoryByID = async (id) => {
    const result123 = await axios.get(`/api/v1/category/${id}`)
    return result123.data.data
  }

  return {
    getCategories,
    getCategoryByID
  }
}

export default makeCategoriesService()
