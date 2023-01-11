<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%">
        <v-card>
          <v-card-title>
            <span class="text-h5">Remove Project</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Name*" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
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
            <v-btn color="blue darken-1" text @click="resetDialog()">
              Cancel
            </v-btn>
            <v-btn color="success darken-1" text @click="resetDialog()">
              Create
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRef, defineProps, onMounted } from "vue";

const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
  // updateDialog: Function
});

const dialog = toRef(props, "dialog");
const resetDialog = toRef(props, "resetDialog");

onMounted(() => {
  console.log("Dialog: ", dialog.value);
});
</script>
