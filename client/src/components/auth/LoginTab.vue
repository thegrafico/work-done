<template>
  <div class="form-panel one">
    <div class="form-header mb-10">
      <h1>{{ title }}</h1>
    </div>
    <div class="form-content">
      <form @submit.prevent="onSubmit">
        <v-text-field class="mb-2" label="username" type="input"></v-text-field>

        <v-text-field label="Password" type="password"></v-text-field>

        <div class="form-group">
          <label class="form-remember">
            <input type="checkbox" />Remember Me </label
          ><a class="form-recovery" href="#">Forgot Password?</a>
        </div>
        <div class="form-group">
          <v-btn color="primary" size="large" type="submit" variant="elevated">
            Log In
          </v-btn>
          <!-- <v-btn rounded="lg" color="primary"> Log In </v-btn> -->
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const title = "Work Done";
</script>

<style scoped>
@import "../../../public/style/login.css";
</style>
