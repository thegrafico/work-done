<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%"  persistent>
        <v-card v-click-outside="resetDialog">
          <v-card-title>
            <span class="text-h5">{{ props.title }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h3>{{props.message}}</h3>
                  <h5 v-if="props.subMessage" class="mt-2">{{props.subMessage}}*</h5>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="resetDialog">
              {{props.closeButtonTittle || "Cancel"}}
            </v-btn>
            <v-btn color="warning" text @click="performAction">
              {{props.submitButtonTittle || "submit"}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits } from "vue";
const emit = defineEmits(['onSubmit']);


const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
  data: Object,
  title: String,
  message: String,
  subMessage: String,
  closeButtonTittle: String,
  submitButtonTittle: String
});

const {dialog, resetDialog} = toRefs(props)

const performAction = () => { 
  resetDialog.value();
  emit("onSubmit", props.data);
}
</script>
