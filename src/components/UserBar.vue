<script setup>
import UploadPhotoModal from "./UploadPhotoModal.vue";
import { useRoute } from "vue-router";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";
import { supabase } from "../supabase";

const route = useRoute();
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const { username: profileUsername } = route.params;

const props = defineProps([
  "user",
  "username",
  "userInfo",
  "addNewPost",
  "isFollowing",
  "updateIsFollwing",
]);

// Following function
const followUser = async () => {
  props.updateIsFollwing(true);
  await supabase.from("followers_following").insert({
    follower_id: user.value.id,
    following_id: props.user.id,
  });
};

const unFollowUser = async () => {
  props.updateIsFollwing(false);
  await supabase
    .from("followers_following")
    .delete()
    .eq("follower_id,", user.value.id)
    .eq("following_id", props.user.id);
};
</script>

<template>
  <div class="userbar-container" v-if="props.user">
    <div class="top-content">
      <a-typography-title :level="2">{{
        props.user.username
      }}</a-typography-title>
      <!-- To show "Upload Photo" button only when we are logged in and on our profile -->
      <!-- To check whether we are authenticated or not we use "user" ! ! ! -->
      <div v-if="user">
        <UploadPhotoModal
          v-if="profileUsername === user.username"
          :addNewPost="addNewPost"
        />
        <div v-else>
          <AButton v-if="!props.isFollowing" @click="followUser"
            >Follow</AButton
          >
          <AButton v-else @click="unFollowUser">Following</AButton>
        </div>
      </div>
    </div>
    <div class="bottom-content">
      <a-typography-title :level="5"
        >{{ props.userInfo.posts }} posts</a-typography-title
      >
      <a-typography-title :level="5">
        {{ props.userInfo.followers }} followers</a-typography-title
      >
      <a-typography-title :level="5">
        {{ props.userInfo.following }} following</a-typography-title
      >
    </div>
  </div>
  <div v-else class="userbar-container">
    <div class="top-content">
      <a-typography-title :level="2">User Not Found</a-typography-title>
    </div>
  </div>
</template>

<style scoped>
.userbar-container {
  padding-bottom: 75px;
}

.bottom-content {
  display: flex;
  align-items: center;
}

.bottom-content h5 {
  margin: 0;
  padding: 0;
  margin-right: 30px;
}

.top-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
