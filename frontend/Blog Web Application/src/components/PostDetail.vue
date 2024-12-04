<script setup>
import { usePostStore } from '@/stores/usePostStore'
const postStore = usePostStore()
</script>

<template>
    <section class="border-black border rounded-3 px-1 py-0 mx-auto mt-5 mb-5 shadow-lg" style="width: 40%; height: 40%;">
        <div class="" v-for="post in postStore.postByID()" :key="post.id">
            <p class="h1">{{ post.title }}</p>      
            <div class="w-100 h-100 d-inline-flex gap-3 p-2 bd-highlight flex-row align-content-start">
                <div class=" overflow-hidden text-center" style="width: 5rem; height: 5rem">
                    <img class="border border-black rounded m-auto d-block img-fluid" :src="`/avatars/${post.authorAvatar}`">
                </div>
                <div class="w-100 h-100 p-1">
                    <h5>{{post.authorName}}</h5>
                    <small>{{ post.date_time }}</small>
                </div>
            </div>
            <div class="mt-1 mb-3 mx-2">
                <img class="w-100 h-100 rounded-3 border border-black" :src="`/images/${post.thumbnail}`" alt="">
            </div>
            <p class="mx-2">{{ post.body }}</p>
        </div>
    </section>
</template>

<style scoped>
</style>