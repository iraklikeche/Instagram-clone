<script setup>
import { ref } from "vue";

const props = defineProps(["isLogin"]);

const visible = ref(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e) => {
  console.log(e);
  visible.value = false;
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
        v-model:value="value"
        placeholder="Username"
      />
      <a-input class="input" v-model:value="value" placeholder="email" />
      <a-input class="input" v-model:value="value" placeholder="password" />
    </a-modal>
  </div>
</template>

<style scoped>
.input {
  margin-top: 8px;
}
</style>
