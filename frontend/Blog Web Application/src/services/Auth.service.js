import axios from 'axios'
import router from '@/router'

const authService = () => {
  const baseURL = '/auth'

  const signIn = (user) => {
    const data = axios.post(`${baseURL}/login`, user)
    console.log(data)
    return data
  }

  const signOut = async () => {
    await axios.post(`${baseURL}/logout`)
    router.push('/signin')
  }

  return {
    signIn,
    signOut,
  }
}

// const isAuthenticated = (accessToken) => {
//   let url = ''
//   const data = efecth(url , {
//     headers: {
//       Authorization: 'Bearer ' + accessToken
//     }
//   })
//   console.log(data.status)
//   return data.status
// }

export default authService()
