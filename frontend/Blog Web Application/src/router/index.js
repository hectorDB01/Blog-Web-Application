import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'
import ProfileUser from '@/components/ProfileUser.vue'
import TheCategories from '@/components/TheCategories.vue'
import PostByCategories from '@/components/PostByCategories.vue'
import PostList from '@/components/PostList.vue'
import PostDetail from '@/components/PostDetail.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            name: 'home',
            component: HomePage,
        },
        {
            path: '/signin',
            name: 'signin',
            component: SignIn,
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp,
        },
        {
            path: '/profile',
            name: 'profile',
            component: ProfileUser,
        },
        {
            path: '/category',
            name: 'category',
            component: TheCategories,
        },
        {
            path: '/post/category/:categoryID',
            name: 'postbycategories',
            component: PostByCategories,
        },
        {
            path: '/',
            name: 'PostList',
            component: PostList,
        },
        {
            path: '/post/:id',
            name: 'PostDetail',
            component: PostDetail,
            props: true,
        },
    ]
})

// router.beforeEach(async (to) => {
//     const publicPages = ['/login'];
//     const authRequired = !publicPages.includes(to.path);
//     const auth = useAuthStore();

//     if (authRequired && !auth.user) {
//         auth.returnUrl = to.fullPath;
//         return '/login';
//     }
// })

export default router