<template>
  <div>
    <v-btn
      :color="color ? color : null"
      :prepend-icon="icon"
      :variant="(variant) ? variant : defaultVariant"
      @click.stop="performAction"
    >
      {{ title }}
    </v-btn>

    <component
      :is="modals[template]"
      :dialog="dialog"
      :reset-dialog="resetDialog"
    ></component>
  </div>
</template>

<script setup>
import { defineProps, onMounted, toRefs, ref } from "vue";
import RemoveProject from "../modals/RemoveProject.vue";
import CreateProject from "../modals/CreateProject.vue";
import EditProject from "../modals/EditProject.vue";
import ShareProject from "../modals/ShareProject.vue";

const modals = {
  RemoveProject,
  CreateProject,
  EditProject,
  ShareProject,
};

const defaultVariant = "text";

const props = defineProps({
  icon: String,
  title: String,
  template: String,
  action: Function,
  color: String,
  variant: String,
});

const { icon, title, template, action, color, variant } = toRefs(props);
const dialog = ref(false);

onMounted(() => {
  console.log("Mounted");
});

const performAction = () => {
  dialog.value = true;
  action.value();
};

const resetDialog = () => {
  console.log("Resetting dialog");
  dialog.value = false;
};
</script>
