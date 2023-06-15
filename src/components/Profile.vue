<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
import { ref, onMounted } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);
const { username } = route.params;
const posts = ref([]);

const loading = ref(false);

const addNewPost = (post) => {
  posts.value.unshift(post);
};

const fetchData = async () => {
  loading.value = true;
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (!userData) {
    loading.value = false;
    return (user.value = null);
  }

  user.value = userData;

  const { data: postData } = await supabase
    .from("posts")
    .select()
    .eq("owner_id", user.value.id);

  posts.value = postData;

  loading.value = false;
};

onMounted(() => {
  fetchData();
});
</script>

/* :key="$route.params.username" to rerender the page so that when we type in
search bar username to make "Upload Photo" disappear */

<template>
  <Container>
    <div class="profile-container" v-if="!loading">
      <UserBar
        :key="$route.params.username"
        :user="user"
        :userInfo="{
          posts: 4,
          followers: 432,
          following: 234,
        }"
        :addNewPost="addNewPost"
      />
      <ImageGallery :posts="posts" />
    </div>
    <div class="spinner" v-else>
      <ASpin size="large" />
    </div>
  </Container>
</template>

<style scoped>
.profile-container {
  padding: 20px 0;
}

.spinner {
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
