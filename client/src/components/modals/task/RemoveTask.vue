<template>
    <div>
      <div class="text-center">
        <v-dialog v-model="dialog" max-width="40%"  persistent>
          <v-card v-click-outside="resetDialog">
            <v-card-title>
              <span class="text-h5">Remove Task</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <h3>Are you sure you want to delete this Task?</h3>
                    <h5 class="mt-2">This cannot be undone.*</h5>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="darken-1" text @click="resetDialog">
                Cancel
              </v-btn>
              <v-btn color="warning" text @click="performRemove">
                Remove
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </div>
  </template>
  
  <script setup>
  import { toRefs, defineProps, onMounted, defineEmits } from "vue";
  const emit = defineEmits(['onSubmit']);
  
  
  const props = defineProps({
    dialog: Boolean,
    resetDialog: Function,
    data: Object,
  });
  
  const {dialog, resetDialog, data} = toRefs(props)
  
  onMounted(() => {
  
    if (!data.value) { 
      // TODO: notify the user of and error
      resetDialog.value();
    }
    
  });
  
  const performRemove = () => { 
    resetDialog.value();
    emit("onSubmit", props.data._id);
  }
  </script>
  