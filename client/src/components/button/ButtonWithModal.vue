<template>
  <div>
    <v-btn :disabled="(disabled) ? disabled : null" :color="color ? color : null" :prepend-icon="icon"
      :variant="variant ? variant : defaultVariant" @click.stop="dialog = true">
      {{ title }}
    </v-btn>

    <!-- TODO: lazy load with this?  -->
    <component :is="modals[template]" :dialog="dialog" :reset-dialog="resetDialog"
      :project="project && project._id ? project : null" @on-submit="performAction"></component>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref } from "vue";
import RemoveProject from "../modals/RemoveProject.vue";
import CreateProject from "../modals/CreateProject.vue";
import EditProject from "../modals/EditProject.vue";
import ShareProject from "../modals/ShareProject.vue";

/**
 * These components are loaded using the :is paramenter.
 */
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
  project: Object,
  disabled: Boolean,
});

const {
  icon,
  title,
  template,
  action,
  color,
  variant,
  disabled,
  project
} = toRefs(props);
const dialog = ref(false);

const performAction = (values) => {
  action.value(values);
  resetDialog();
};

const resetDialog = () => {
  dialog.value = false;
};
</script>
