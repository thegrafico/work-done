<template>
  <div class="form-panel one">
    <div class="form-header mb-10">
      <h1>Work Done</h1>
    </div>
    <div class="form-content">
      <v-form ref="form" @submit.prevent="login">
        <v-text-field :rules="usernameRule" class="mb-2" label="username" type="text" v-model.trim="username"
          required></v-text-field>

        <v-text-field :rules="passwordRule" label="Password" type="password" v-model.trim="password"></v-text-field>

        <!-- TODO: Remember me -->
        <div class="form-group">
          <label class="form-remember">
            <input type="checkbox" />Remember Me
          </label>
          <!-- TODO: Forgot Password -->
          <a class="form-recovery" href="#">Forgot Password?</a>
        </div>

        <div class="form-group">
          <v-btn color="blue" size="large" type="submit" variant="elevated" :disabled="isLoading">

            <p v-if="!isLoading">
              Log In
            </p>

            <v-progress-circular v-if="isLoading" indeterminate :size="25" color="primary"></v-progress-circular>
          </v-btn>
          <!-- <v-btn rounded="lg" color="primary"> Log In </v-btn> -->
        </div>
      </v-form>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { isEmpty } from "lodash";
import { usernameRule, passwordRule } from "@/utils/form-rules-validation";

const emit = defineEmits(["login"]);

const username = ref("");
const password = ref("");
const isLoading = ref(false);


// login form
const form = ref(null);

async function login() {

  // get form
  const formResponse = await form.value.validate();
  // check if form is valid
  if (!formResponse.valid) { return; }

  isLoading.value = true;
  const uName = username.value;
  const uPass = password.value;

  if (isEmpty(uPass) || uPass.length < 3) {
    alert("Invalid Password");
    return;
  }

  // Call the login function from the parent
  emit("login", uName, uPass, resetLoading);
  // isLoading.value = false;
}


const resetLoading = () => {
  isLoading.value = false;
}
</script>

<style scoped>
@import "../../../public/style/login.css";
</style>
