import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore("users", () => {
  const user = ref(null);
  const errorMsg = ref("");
  const loading = ref(false)


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

    // LOADING
    loading.value = true

    // VALIDATE IF USER EXISTS

    const { data: userWithUsername } = await supabase
      .from("users")
      .select()
      .eq("username", username)
      .single();

    if (userWithUsername) {
      loading.value = false
      return (errorMsg.value = "User already registered");
    }

    errorMsg.value = "";

    // // SIGN-UP

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      loading.value = false
      return (errorMsg.value = error.message);
    }

    await supabase.from("users").insert({
      username,
      email,
    });

    loading.value = false
  };

  const handleLoginOut = () => {};

  const handleGetUSer = () => {};

  const clearErrorMsg = () => {
    errorMsg.value = "";
  };

  return {
    user,
    loading,
    handleLogin,
    handleSignUp,
    handleLoginOut,
    handleGetUSer,
    errorMsg,
    clearErrorMsg,
  };
});
