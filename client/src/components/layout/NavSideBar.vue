<template>
  <v-navigation-drawer v-model="drawer">
    <v-container fluid v-if="username">
      <v-row>
        <v-col cols="12">
          <div class="d-flex justify-center">
            <v-avatar
              class="aling-center"
              color="grey-darken-1"
              size="64"
            ></v-avatar>
          </div>
        </v-col>

        <v-col cols="12">
          <div class="d-flex justify-center">
            <div class="font-weight-black">{{ capitalize(username)}}</div>
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="username"></v-divider>

    <v-list>
      <v-list-item v-for="[icon, text] in links" :key="icon" link>
        <template v-slot:prepend>
          <v-icon>{{ icon }}</v-icon>
        </template>

        <v-list-item-title>{{ text }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { capitalize, onMounted } from "vue";
import { ref, defineProps, toRefs } from "vue";
import {sideOptions} from '@/utils/Constans'

const props = defineProps( { 
    username: String,
    options: String
})

const {username} = toRefs(props);

const drawer = ref(null);
const links = ref([]);

onMounted(() => { 
  links.value = getSideOption(props.options || 'dashboard');
})

const getSideOption = (option) => { 
  return sideOptions[option];
}

</script>
