<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
</script>

<template>
  <Container>
    <div class="profile-container">
      <UserBar
        username="IrakliKeche"
        :userInfo="{
          posts: 4,
          followers: 432,
          following: 234,
        }"
      />
      <ImageGallery
        :posts="[
          {
            id: 1,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
          {
            id: 2,
            image:
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU',
          },
        ]"
      />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  padding: 20px 0;
}
</style>
