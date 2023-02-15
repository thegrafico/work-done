<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%"  persistent>
        <v-card v-click-outside="resetDialog">
          <v-card-title>
            <span class="text-h5">Cancel Invitation</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <h3>Are you sure you want to cancel this invitation?</h3>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="resetDialog">
              Close
            </v-btn>
            <v-btn color="warning" text @click="cancelInvitation">
              Cancel Invitation
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
  project: Object,
});

const {dialog, resetDialog, project} = toRefs(props)

onMounted(() => {

  if (!project) { 
    // TODO: notify the user of and error
    resetDialog.value();
  }
  
});

const cancelInvitation = () => { 
  resetDialog.value();
  emit("onSubmit", props.project._id);
}
</script>
