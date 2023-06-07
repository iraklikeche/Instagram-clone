<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { errorMsg } = storeToRefs(userStore);
const props = defineProps(["isLogin"]);

const visible = ref(false);

const userCredentials = ref({
  email: "",
  password: "",
  usename: "",
});

const showModal = () => {
  visible.value = true;
};

const handleOk = (e) => {
  userStore.handleSignUp(userCredentials.value);
};

const title = props.isLogin ? "Login" : "Sign Up";
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal">{{ title }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <a-input
        class="input"
        v-if="!isLogin"
        v-model:value="userCredentials.username"
        placeholder="Username"
      />
      <a-input
        class="input"
        v-model:value="userCredentials.email"
        placeholder="email"
      />
      <a-input
        type="password"
        class="input"
        v-model:value="userCredentials.password"
        placeholder="password"
      />
      <a-typography-text v-if="errorMsg" type="danger">{{
        errorMsg
      }}</a-typography-text>
    </a-modal>
  </div>
</template>

<style scoped>
.input {
  margin-top: 8px;
}
</style>
