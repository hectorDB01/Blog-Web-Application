import { defineStore } from 'pinia'
import usersService from '@/services/Users.service'
import { ref } from 'vue'

export const useUserStore = defineStore('users', () => {
  const users = ref([])

  const usersPromise = usersService.getUsers()
  usersPromise.then((data) => {
    users.value = data.users
  })

  return { users }
})
