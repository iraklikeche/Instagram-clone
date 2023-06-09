<script setup>
import Container from "./Container.vue";
import UserBar from "./UserBar.vue";
import ImageGallery from "./ImageGallery.vue";
import { ref, onMounted, watch } from "vue";
import { supabase } from "../supabase";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const route = useRoute();

const userStore = useUserStore();
const isFollowing = ref(false);
const { username } = route.params;
const { user: LoggedInUser } = storeToRefs(userStore);

const posts = ref([]);
const user = ref(null);
const loading = ref(false);
const userInfo = ref({ posts: null, followers: null, following: null });

const addNewPost = (post) => {
  posts.value.unshift(post);
};

// To update follow/following button, we take boolean as an argument, then pass it to child through props
const updateIsFollwing = (follow) => {
  isFollowing.value = follow;
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

  await fetchIsFollowing();
  const followerCount = await fetchFollowersCount();
  const followingCount = await fetchFollowingCount();

  userInfo.value.followers = followerCount;
  userInfo.value.following = followingCount;
  userInfo.value.posts = posts.value.length;

  loading.value = false;
};

const fetchFollowersCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("following_id", user.value.id);

  return count;
};

const fetchFollowingCount = async () => {
  const { count } = await supabase
    .from("followers_following")
    .select("*", { count: "exact" })
    .eq("follower_id", user.value.id);

  return count;
};

const fetchIsFollowing = async () => {
  // Logged user might be null for a brief period of time when we get authenticated, so ... =>
  if (LoggedInUser.value && LoggedInUser.value.id !== user.value.id) {
    const { data } = await supabase
      .from("followers_following")
      .select()
      .eq("follower_id", LoggedInUser.value.id)
      .eq("following_id", user.value.id)
      .single();

    if (data) isFollowing.value = true;
  }
};

// We need watch because we may reach calling "await fetchIsFollowing();"
//  this function above before we actually have fetched the user,
//   logged in user, and then we my might not hit the "if block" in the function
// and "isFollowing.value "will always be false

watch(LoggedInUser, () => {
  fetchIsFollowing();
});

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
        :userInfo="userInfo"
        :addNewPost="addNewPost"
        :isFollowing="isFollowing"
        :updateIsFollwing="updateIsFollwing"
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
