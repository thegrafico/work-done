<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%" persistent>
        <v-card v-click-outside="resetDialog">
          <v-card-title>
            <span class="text-h5">User Invitation</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field label="Username" v-model.trim="username"></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="darken-1" text @click="resetDialog">
              Cancel
            </v-btn>
            <v-btn color="success" text @click="sendInvite">
              Send Invite
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, defineEmits, ref } from "vue";
const emit = defineEmits(['onSubmit']);


const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
  data: Object,
});

const { dialog, resetDialog } = toRefs(props)

const username = ref('');


const sendInvite = () => {
  emit("onSubmit", { to: username.value });
}
</script>
