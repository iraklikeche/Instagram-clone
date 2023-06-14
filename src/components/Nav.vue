<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user, loadingUser } = storeToRefs(userStore);

const router = useRouter();
const searchUserName = ref("");

const onSearch = () => {
  if (searchUserName.value) {
    router.push(`/profile/${searchUserName.value}`);
    searchUserName.value = "";
  }
};

const handleLogOut = async () => {
  await userStore.handleLogOut();
};

const goToUsersProfile = () => {
  router.push(`/profile/${user.value.username}`);
};
</script>

<template>
  <a-layout-header>
    <Container>
      <div class="nav-container">
        <div class="right-content">
          <RouterLink to="/">Instagram</RouterLink>
          <a-input-search
            v-model:value="searchUserName"
            placeholder="Username..."
            style="width: 200px"
            @search="onSearch"
          />
        </div>
        <div v-if="!loadingUser">
          <div class="left-content" v-if="!user">
            <AuthModal :isLogin="false" />
            <AuthModal :isLogin="true" />
          </div>
          <div class="left-content" v-else="user">
            <AButton type="primary" @click="goToUsersProfile">Profile</AButton>
            <AButton type="primary" @click="handleLogOut">Logout</AButton>
          </div>
        </div>
      </div>
    </Container>
  </a-layout-header>
</template>

<style scoped>
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right-content {
  display: flex;
  align-items: center;
}

.left-content {
  display: flex;
  align-items: center;
  gap: 10px;
}

.right-content a {
  margin-right: 10px;
}
</style>
