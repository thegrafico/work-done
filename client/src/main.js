import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia';

// vuetify style
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader


const vuetify = createVuetify({
  components,
  directives,
  // "theme": {
  //   defaultTheme: 'dark'
  // },

});



const app = createApp(App);

app.use(router).use(vuetify).use(createPinia()).mount('#app');

app.config.errorHandler = function (error, vm, info) {
  console.error("Error: ", error);
  console.warn("info: ", info);

  if (error.response.status === 401 || error.response.status === 403){
    vm.$router.push('/logout');
  }
  
}
