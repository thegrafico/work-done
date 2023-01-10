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
  "theme": {
    defaultTheme: 'dark'
  },
  
});

createApp(App)
  .use(router)
  .use(vuetify)
  .use(createPinia())
  .mount('#app');
