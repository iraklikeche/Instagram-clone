<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
import { ref } from "vue";

const posts = ref([]);

const addNewPost = (post) => {
  posts.value.unshift(post);
};
</script>

/* :key="$route.params.username" to rerender the page so that when we type in
search bar username to make "Upload Photo" disappear */

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        :key="$route.params.username"
        username="IrakliKeche"
        :userInfo="{
          posts: 4,
          followers: 432,
          following: 234,
        }"
        :addNewPost="addNewPost"
      />
      <ImageGallery :posts="posts" />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  padding: 20px 0;
}
</style>
