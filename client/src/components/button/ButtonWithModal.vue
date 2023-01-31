<template>
  <div>
    <v-btn :disabled="(disabled) ? disabled : null" :color="color ? color : null" :prepend-icon="icon"
      :variant="variant ? variant : defaultVariant" @click.stop="dialog = true">
      {{ title }}
    </v-btn>

    <!-- TODO: lazy load with this?  -->
    <component v-if="dialog" :is="modals[template]" :dialog="dialog" :reset-dialog="resetDialog"
      :data="(data && data._id) ? data : null" :project="project && project._id ? project : null"
      @on-submit="performAction">
    </component>
  </div>
</template>

<script setup>
import { defineProps, toRefs, ref, defineAsyncComponent } from "vue";

/**
 * These components are loaded using the :is paramenter.
 */

const modals = {
  RemoveProject: defineAsyncComponent(() =>
    import("../modals/RemoveProject.vue")),
  CreateProject: defineAsyncComponent(() =>
    import("../modals/CreateProject.vue")),
  EditProject: defineAsyncComponent(() =>
    import("../modals/EditProject.vue")),
  ShareProject: defineAsyncComponent(() =>
    import("../modals/ShareProject.vue")),
  createTask: defineAsyncComponent(() =>
    import("../modals/task/createTask.vue")),
  removeTask: defineAsyncComponent(() =>
    import("../modals/task/RemoveTask.vue")),
  UserInvitation: defineAsyncComponent(() =>
    import("../modals/collabs/UserInvitation.vue")),
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
  data: Object
});

const {
  icon,
  title,
  template,
  action,
  color,
  variant,
  disabled,
  project,
  data
} = toRefs(props);
const dialog = ref(false);

const performAction = async (values) => {
  await action.value(values);
  resetDialog();
};

const resetDialog = () => {
  dialog.value = false;
};
</script>
