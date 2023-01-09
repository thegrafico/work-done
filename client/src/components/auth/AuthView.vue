<template>
  <v-form class="form" ref="form">
    <div class="form-toggle"></div>

    <!-- Login -->
    <LoginTab @login="loginUser" />

    <!-- Sign In -->
    <SignInTab />

  </v-form>
</template>

<script setup>
  import LoginTab from "./LoginTab.vue";
  import SignInTab from "./SignInTab.vue";
  import { useRouter } from 'vue-router';
  import Api from "../../api/api";

  const router = useRouter()
  const api = new Api();
  
  // Method called by emit
  const loginUser = async (username, password) => {
    
    const userData = await api.login(username, password);
    // TODO: Store user data into pinea. Including the Token
    
    if (userData.token) { 
      router.push('/dashboard')
    }else{
      router.push('/');
    }
  }

</script>

<style scoped>
@import "../../../public/style/login.css";
</style>



<!-- $(document).ready(function() {
  var panelOne = $('.form-panel.two').height(),
    panelTwo = $('.form-panel.two')[0].scrollHeight;

  $('.form-panel.two').not('.form-panel.two.active').on('click', function(e) {
    e.preventDefault();

    $('.form-toggle').addClass('visible');
    $('.form-panel.one').addClass('hidden');
    $('.form-panel.two').addClass('active');
    $('.form').animate({
      'height': panelTwo
    }, 200);
  });

  $('.form-toggle').on('click', function(e) {
    e.preventDefault();
    $(this).removeClass('visible');
    $('.form-panel.one').removeClass('hidden');
    $('.form-panel.two').removeClass('active');
    $('.form').animate({
      'height': panelOne
    }, 200);
  });
}); -->