<template>
  <v-app>
    <v-form class="form" ref="form" lazy-validation>
      <div class="form-toggle"></div>
      
      <LoginTab/>

      <SignInTab/>
     
    </v-form>
  </v-app>
</template>

<script setup>
  import LoginTab from './components/auth/LoginTab.vue';
  import SignInTab from './components/auth/SignInTab.vue';
</script>

<style scoped>
@import "./../public/style/login.css";
</style>
