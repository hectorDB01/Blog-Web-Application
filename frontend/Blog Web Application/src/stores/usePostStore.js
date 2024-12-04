import { defineStore } from 'pinia'
import PostsService from '@/services/Posts.service'
import { useUserStore } from './useUserStore'
import { useCategoryStore } from './useCategoryStore'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'


export const usePostStore = defineStore('posts', () => {
    const route = useRoute()
    const userStore = useUserStore()
    const categoryStore = useCategoryStore()
    const posts = ref([])

    const postsPromise = PostsService.getPosts()
    postsPromise.then((data) => {
        posts.value = data.posts
    })

    const adjustedPosts = (post) => {
        const category = categoryStore.categories.find((category) => category.id === post.category_id)
        const user =  userStore.users.find((user) => user.id === post.author_id)
        return {
            ...post,
            categoryTitle: category ? category.title : 'Unknown Category',
            authorName: user ? user.first_name.concat(' ', user.last_name) : 'Unknown Author',
            authorAvatar: user ? user.avatar : null
        }  
    }

    const statPosts = computed(() => {
        return posts.value.map((post) => {
           return adjustedPosts(post)
        })
    })
    
    const postByCategoriesArray = ref([])
    const postByCategories = () => {
        const postByCategoryPromise = PostsService.getPostsByCategory(route.params.categoryID)
        postByCategoryPromise.then((data) => {
            postByCategoriesArray.value = data.posts
        })
        return postByCategoriesArray.value.map((post) => {
           return adjustedPosts(post)
        })
    };

    const postByIDArray = ref([])
    const postByID = () => {
        const postByIDPromise = PostsService.getPost(route.params.id)
        postByIDPromise.then((data) => {
            console.log(data.post)
            postByIDArray.value = data.post
        })
        return postByIDArray.value.map((post) => {
           return adjustedPosts(post)
        })
    }

    return {posts, statPosts, postByCategories, postByID}
})