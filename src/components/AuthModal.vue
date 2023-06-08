<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { errorMsg, loading } = storeToRefs(userStore);
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

const handleOk = () => {
  userStore.handleSignUp(userCredentials.value);
};

const handleCancel = () => {
  userStore.clearErrorMsg();
  visible.value = false;
};

const title = props.isLogin ? "Login" : "Sign Up";
</script>

<template>
  <div>
    <a-button type="primary" @click="showModal">{{ title }}</a-button>
    <a-modal v-model:visible="visible" :title="title" @ok="handleOk">
      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="loading"
          @click="handleOk"
          :disabled="loading"
          >Submit
        </a-button>
      </template>
      <div v-if="!loading" class="input-container">
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
      </div>
      <div class="spinner" v-else>
        <ASpin />
      </div>
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

.input-container {
  height: 120px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
}
</style>
