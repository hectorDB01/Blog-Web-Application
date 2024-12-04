<script setup>
import { usePostStore } from '@/stores/usePostStore'
const postStore = usePostStore()

</script>

<template>
  <section class="posts">
    <div class="container">
      <article v-for="post in postStore.statPosts" :key="post.id" class="post">
        <div class="post_thumbnail">
          <img :src="`/thumbnails/${post.thumbnail}`" alt="Post Thumbnail" />
        </div>
        <div class="post_info">
          <a href="#" class="category_button">{{ post.categoryTitle }}</a>
          <h3 class="post_title">
            <a href="#">{{ post.title }}</a>
          </h3>
          <p class="post_body">{{ post.body }}</p>
          <div class="post_author">
            <img :src="`/avatars/${post.authorAvatar}`" alt="Author Avatar" />
            <div>
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
</style>
