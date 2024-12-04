<script setup>
import { useCategoryStore } from '@/stores/useCategoryStore'
const store = useCategoryStore()
</script>

<template>
  <section class="button-style mt-5">
    <div class="text-center mb-4 shadow-lg p-3 mb-5 bg-body rounded">
      <h1 class="">Categories</h1>
    </div>
    <div class="container">
      <div class="row">
        <div class="text-center">
          <a :href="`/post/category/${category.id}`"
            class="highlight-button btn btn-medium button xs-margin-bottom-five mb-2" data-abc="true"
            v-for="category in store.categories" :key="category.id">
            <i class="fa fa-warning"></i>{{ category.title }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
body {
  background: #eee;
}

.container {
  margin-top: 3rem;
}

.btn {
  display: inline-block;
  margin-right: 20px;
  letter-spacing: 2px;
  border: 1px solid transparent;
  box-shadow: 10px 10px gray;
  margin-bottom: 20px;
}

.btn i {
  margin-right: 5px;
}

.button {
  margin-top: 0;
}

.btn.btn-medium {
  font-size: 14px;
  padding: 10px 22px;
}

.highlight-button {
  border: 2px solid #000;
  display: inline-block;
  padding: 8px 20px 9px;
  font-size: 12px;
  color: #000;
  background-color: transparent;
}

.highlight-button:hover {
  background-color: #000;
  border: 2px solid #000;
  color: #fff;
}

.highlight-button i {
  color: #000;
}

.highlight-button:hover i {
  color: #fff;
}
</style>
