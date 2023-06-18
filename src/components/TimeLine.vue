<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user, loading } = storeToRefs();

const data = [
  {
    id: 1,
    username: "S.Gomez",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO1PmDqOpCm13vf9zhLg5qPyJLbVETS0TjRQ&usqp=CAU",
    caption: "i am so sick of that same old love !",
  },
  {
    id: 2,
    username: "Kvara",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkCYU1mSKENvg8q_mr77JZUkV-FBJdnW-9VQ&usqp=CAU",
    caption: "Time To Sleep",
  },
];
</script>

<template>
  <Container>
    <div v-if="!loadingUser">
      <div v-if="user" class="timeline-container">
        <Card v-for="post in data" :key="post.id" :post="post" />
      </div>
      <div v-else class="timeline-container">
        <h2>Log in to see posts</h2>
      </div>
    </div>
    <div class="spinner" v-else>
      <ASpin />
    </div>
  </Container>
</template>

<style scoped>
.timeline-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 20px 0;
}
</style>
