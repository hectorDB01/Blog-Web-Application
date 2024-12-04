<script setup>
import { usePostStore } from '@/stores/usePostStore'
import router from '@/router';
const postStore = usePostStore()
const goToPostDetail = (id) => {
  router.push({ name: 'PostDetail', params: { id } })
}
</script>
<template>

  <section class="posts">
    <div class="text-center mb-4 shadow-lg p-3 mb-5 bg-body rounded">
      <h1 class="">{{ postStore.postByCategories()[0].categoryTitle }}</h1>
    </div>
    <h1></h1>
    <div class="container posts_container">
      <article class="post" v-for="post in postStore.postByCategories()" :key="post.id">
        <div class="post_thumbnail">
          <img :src="`/thumbnails/${post.thumbnail}`" />
        </div>
        <div class="post_info">
          <a href="">{{ post.categoryTitle }}</a>
          <h3 class="post_title">
            <a @click.prevent="goToPostDetail(post.id)">{{ post.title }}</a>
          </h3>
          <p class="post_body">
            {{ post.body }}
          </p>
          <div class="post_author">
            <div class="post_author-avatar justify-content-center">
              <img :src="`/avatars/${post.authorAvatar}`" for="author_avatar" />
            </div>
            <div class="post_author-info">
              <h5>By: {{ post.authorName }}</h5>
              <small>{{ post.date_time }}</small>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
* {
  outline: 0;
  border: 0;
  appearance: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  line-height: 1.6;
  color: black;
  overflow-x: hidden;
  background: gray;
  font-size: 0.9rem;
}

a {
  color: black;
  transition: all 300ms ease;
}

section {
  margin-top: 1rem;
  width: 100vw;
}

.container {
  width: 74%;
  max-width: 1800px;
  margin-inline: auto;
  /* the same as margin: 0 auto; */
}

h1 {
  font-size: 3rem;
  margin: 1rem 0;
}

h2 {
  font-size: 1.7rem;
  margin: 1rem 0;
}

h3 {
  font-size: 1.1rem;
  margin: 0.8rem 0 0.5rem;
}

h4 {
  font-size: 1rem;
}

h5 {
  margin: auto;
}

h1,
h2,
h3,
h4,
h5 {
  color: black;
  line-height: 1.3;
  margin: 0;
}

/* ==============================================================================================
FEATURED
==============================================================================================
*/

img {
  display: block;
  width: 100%;
  object-fit: cover;
}

.featured {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.featured_container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 5px;
  border: 1px solid black;
}

.post {
  padding: 5px;
  border: 1px solid black;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: 10px 10px black;
}

.featured .post_thumbnail {
  height: fit-content;
}

.post_thumbnail {
  border-radius: 10px;
  border: 0.75rem solid black;
  overflow: hidden;
  margin-bottom: 1.6rem;
}

.post:hover .post_thumbnail img {
  filter: saturate(0);
  transition: filter 500ms ease;
}

.post_author {
  display: flex;
  gap: 1rem;
  margin-top: 1.2rem;
}

.post_author-avatar {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.8rem;
  overflow: hidden;
}

.posts_container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5rem;
  margin-bottom: 5rem;
}
</style>
