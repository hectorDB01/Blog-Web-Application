import { defineStore } from 'pinia'
import CategoriesService from '@/services/Categories.service'
import { ref } from 'vue'

export const useCategoryStore = defineStore('categories', () => {
  const categories = ref([])

  const categoriesPromise = CategoriesService.getCategories()
  categoriesPromise.then((data) => {
    categories.value = data.categories
  })

  return { categories }
})
