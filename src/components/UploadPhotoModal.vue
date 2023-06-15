<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useUserStore } from "../stores/users";
import { storeToRefs } from "pinia";

const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const props = defineProps(["addNewPost"]);
const loading = ref(false);
const errorMsg = ref("");
const visible = ref(false);
const caption = ref("");
const file = ref(null);

const showModal = () => {
  visible.value = true;
};

const handleOk = async () => {
  loading.value = true;
  const fileName = Math.floor(Math.random() * 1000000000000000);

  let filePath;

  if (file.value) {
    const { data, error } = await supabase.storage
      .from("images")
      .upload("public/" + fileName, file.value);

    if (error) {
      loading.value = false;
      return (errorMsg.value = "Unable to upload image");
    }
    filePath = data.path;
    await supabase.from("posts").insert({
      url: filePath,
      caption: caption.value,
      owner_id: user.value.id,
    });
    caption.value = "";
  }

  loading.value = false;
  visible.value = false;
  caption.value = "";

  props.addNewPost({
    url: filePath,
    caption: caption.value,
  });
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
      <div v-if="!loading">
        <input type="file" accept=".jpeg,.png" @change="handleUploadChange" />
        <a-input
          v-model:value="caption"
          :maxLength="50"
          placeholder="Caption..."
        />
        <a-typography-text v-if="errorMsg" type="danger">{{
          errorMsg
        }}</a-typography-text>
      </div>
      <div class="spinner" v-else>
        <ASpin />
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
input {
  margin-top: 10px;
}

.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
