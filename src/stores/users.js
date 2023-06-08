import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMsg = ref("");
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleLogin = () => {};

  const handleSignUp = async (credentials) => {
    const { email, password, username } = credentials;

    if (password.length < 6) {
      return (errorMsg.value = "Password length is too short");
    }

    if (username.length < 4) {
      return (errorMsg.value = "Username length is too short");
    }

    if (!validateEmail(email)) {
      return (errorMsg.value = "Email is invalid");
    }

    errorMsg.value = "";

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      return (errorMsg.value = error.message);
    }

    await supabase.from("users").insert({
      username,
      email,
    });
  };

  const handleLoginOut = () => {};

  const handleGetUSer = () => {};

  return {
    user,
    handleLogin,
    handleSignUp,
    handleLoginOut,
    handleGetUSer,
    errorMsg,
  };
});
