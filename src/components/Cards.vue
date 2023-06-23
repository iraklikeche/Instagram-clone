<script setup>
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/users";
import { supabase } from "../supabase";
import Card from "./Card.vue";
import Observer from "./Observer.vue";
import { onMounted, ref } from "vue";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);

const posts = ref([]);
const lastCardIndex = ref(2);
const ownerIds = ref([]);

const fetchData = async () => {
  const { data: followings } = await supabase
    .from("followers_following")
    .select("following_id")
    .eq("follower_id", user.value.id);

  ownerIds.value = followings.map((f) => f.following_id);

  const { data } = await supabase
    .from("posts")
    .select()
    .in("owner_id", ownerIds.value)
    .range(0, lastCardIndex.value)
    .order("created_at", { ascending: false });

  posts.value = data;
};

const fetchNextSet = async () => {
  const { data } = await supabase
    .from("posts")
    .select()
    .in("owner_id", ownerIds.value)
    .range(lastCardIndex.value + 1, lastCardIndex.value + 3)
    .order("created_at", { ascending: false });

  posts.value = [...posts.value, ...data];
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <div>
    <div class="timeline-container">
      <Card v-for="post in posts" :key="post.id" :post="post" />
      <Observer v-if="posts.length" @intersect="fetchNextSet" />
    </div>
  </div>
</template>
