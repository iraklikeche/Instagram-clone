<script setup>
import Profile from "../components/Profile.vue";

// :key="$route.params.username" to rerender the page so that when we type
//     in search bar username to make "Upload Photo" disappear
</script>

<template>
  <main>
    <Profile :key="$route.params.username" />
  </main>
</template>
