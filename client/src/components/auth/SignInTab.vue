<template>
  <v-dialog v-model="dialog" max-width="40%" persistent>
    <v-btn class="close-btn" icon @click="resetDialog">
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-form ref="form" v-click-outside="resetDialog">
      <div class="form-panel two">

        <div class="form-header">
          <h1>Register Account</h1>
        </div>
        <div class="form-content">
          <div class="form-group">
            <v-text-field :rules="usernameRule" class="mb-2" label="Username" type="text" variant="outlined" color="#fff"
              bg-color="rgba(0, 0, 0, 0.1)" v-model.trim="username" required></v-text-field>
          </div>
          <div class="form-group">
            <v-text-field :rules="passwordRule" class="mb-2" label="Password" type="password" variant="outlined"
              color="#fff" bg-color="rgba(0, 0, 0, 0.1)" v-model.trim="password" required></v-text-field>
          </div>
          <div class="form-group">
            <v-text-field :rules="[...passwordRule, passwordMatch]" class="mb-2" label="Confirm password" type="password"
              variant="outlined" color="#fff" bg-color="rgba(0, 0, 0, 0.1)" v-model.trim="confirmationPassword"
              required></v-text-field>
          </div>
          <div class="form-group">
            <v-text-field :rules="emailRules" class="mb-2" label="Email Address" type="text" variant="outlined"
              color="#fff" bg-color="rgba(0, 0, 0, 0.1)" v-model.trim="email" required></v-text-field>
          </div>
          <div class="form-group">
            <v-btn color="white" size="large" type="submit" variant="elevated" :disabled="loading"
              @click="performAction">
              <p v-if="!loading">
                Register
              </p>

              <v-progress-circular v-else indeterminate :size="25" color="white"></v-progress-circular>
            </v-btn>
          </div>
        </div>
      </div>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { toRefs, defineProps, ref } from "vue";
import { usernameRule, passwordRule, emailRules } from "@/utils/form-rules-validation";
import { useAuthStore } from "@/stores/auth.store";
import { storeToRefs } from "pinia";

// const emit = defineEmits(["onSubmit"]);
const { signIn } = useAuthStore();
const { loading } = storeToRefs(useAuthStore());

const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
  data: Object,
});

// form inputs
const username = ref("");
const email = ref("");
const password = ref("");
const confirmationPassword = ref("");

// form
const form = ref(null);

// modal values
const { dialog, resetDialog } = toRefs(props);


const performAction = async () => {

  // get form
  const formIsValid = await form.value.validate();
  // check if form is valid
  if (!formIsValid.valid) { return; }

  const newUser = {
    username: username.value,
    password: password.value,
    email: email.value
  }

  await signIn(newUser);
}


const passwordMatch = (pass) => {
  return (pass == password.value) || "Password does not math"
}
</script>

<style scoped>
.close-btn {
  position: absolute;
  left: 0;
  margin-left: 1em;
  margin-top: 1em;
}
</style>
