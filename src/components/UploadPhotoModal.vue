<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const visible = ref(false);
const caption = ref("");
const file = ref(null);

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  const fileName = Math.floor(Math.random() * 1000000000000000);
  if (file.value) {
    const response = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);
    console.log({ response });
  }
};

const handleUploadChange = (e) => {
  if (e.target.files[0]) {
    file.value = e.target.files[0];
  }
};
</script>

<template>
  <div>
    <a-button @click="showModal">Upload Photo</a-button>
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
      <a-input
        v-model:value="caption"
        :maxLength="50"
        placeholder="Caption..."
      />
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}
</style>
