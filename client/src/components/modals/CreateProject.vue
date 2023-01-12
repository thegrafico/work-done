<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%" persistent>
        <v-card v-click-outside="resetDialog">
          <v-card-title>
            <span class="text-h5">Create Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name*"
                    v-model.trim="title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model.trim="description"
                    clearable
                    label="Description"
                    variant="outlined"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="resetDialog"> Cancel </v-btn>
            <v-btn color="success" text @click="performAction"> Create </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, ref, defineEmits} from "vue";
import _ from "lodash";
const emit = defineEmits(["onSubmit"]);

const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
});

const { dialog, resetDialog } = toRefs(props);
const title = ref('');
const description = ref('');

const performAction = () => {
  
  if (nothingChanged()) {
    resetDialog.value();
    return;
  }

  if (_.isEmpty(title.value)) {
    // TODO: show error message
    return;
  }

  emit("onSubmit", {
    title: title.value,
    description: description.value,
  });
};

const nothingChanged = () => {
  return (
    props &&
    props.project &&
    title.value === props.project.title &&
    description.value === props.project.description
  );
};
</script>
