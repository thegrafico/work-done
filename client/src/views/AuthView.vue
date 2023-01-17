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
  import LoginTab from "../components/auth/LoginTab.vue";
  import SignInTab from "../components/auth/SignInTab.vue";
  import {useAuthStore} from '@/stores/auth.store';
  import { onMounted } from "vue";
  

  onMounted( () => {
    checkIfUserIsLoggedIn();
  });

  // Method called by emit
  const loginUser = async (username, password) => {
    
    const authStore = useAuthStore();
    
    return authStore.login(username, password).catch( err => {
      console.error(err);
    });
  }

  const checkIfUserIsLoggedIn = () => {
    
    const useStore = useAuthStore();
    if (useStore.getUser) { 
      return useStore.redirectToHome();
    }

    // clean store just in case
    useStore.clearUser();
  }

</script>

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