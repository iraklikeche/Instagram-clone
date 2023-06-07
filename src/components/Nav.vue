<script setup>
import { RouterLink, useRouter } from "vue-router";
import Container from "./Container.vue";
import AuthModal from "./AuthModal.vue";
import { ref } from "vue";

const router = useRouter();
const searchUserName = ref("");
const isAuthenticated = ref(false);

const onSearch = () => {
  if (searchUserName.value) {
    router.push(`/profile/${searchUserName.value}`);
    searchUserName.value = "";
  }
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
        <div class="left-content" v-if="!isAuthenticated">
          <AuthModal :isLogin="false" />
          <AuthModal :isLogin="true" />
        </div>
        <div class="left-content" v-else="isAuthenticated">
          <AButton type="primary">Profile</AButton>
          <AButton type="primary">Logout</AButton>
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
