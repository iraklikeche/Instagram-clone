<script setup>
import Container from "./Container.vue";
import Card from "./Card.vue";

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
    <div class="timeline-container">
      <Card v-for="post in data" :key="post.id" :post="post" />
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
