<template>
  <div>
    <v-btn
      :color="color ? color : null"
      :prepend-icon="icon"
      :variant="variant ? variant : defaultVariant"
      @click.stop="dialog = true"
    >
      {{ title }}
    </v-btn>

    <component
      :is="modals[template]"
      :dialog="dialog"
      :reset-dialog="resetDialog"
      :project="project && project._id ? project : null"
      @on-submit="performAction"
    ></component>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref } from "vue";
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
  project: Object,
});

const { icon, title, template, action, color, variant, project } =
  toRefs(props);
const dialog = ref(false);

const performAction = (values) => {
  if (values) {
    action.value(values);
  }

  resetDialog();
};

const resetDialog = () => {
  dialog.value = false;
};
</script>
