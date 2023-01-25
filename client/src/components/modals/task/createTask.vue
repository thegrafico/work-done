<template>
  <div>
    <div class="text-center">
      <v-dialog v-model="dialog" max-width="40%" persistent>
        <v-form ref="form">

          <v-card v-click-outside="resetDialog">
            <v-card-title>
              <span class="text-h5">{{ isUpdate? "Update": "Create" }} Task</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6">
                    <v-text-field label="Name*" :rules="taskRules.name" v-model.trim="title"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field label="Points Value*" :rules="taskRules.points" v-model.trim="valuePoints"
                      required></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea v-model.trim="description" clearable label="Description"
                      variant="outlined"></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
              <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="resetDialog"> Cancel </v-btn>
              <v-btn color="success" text @click="performAction"> {{ isUpdate? "Save": "Create" }} </v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-dialog>
    </div>
  </div>
</template>

<script setup>
import { toRefs, defineProps, ref, defineEmits, onMounted } from "vue";
import { taskRules } from "@/utils/form-rules-validation";
const emit = defineEmits(["onSubmit"]);

const props = defineProps({
  dialog: Boolean,
  resetDialog: Function,
  data: Object,
});

const { dialog, resetDialog, data } = toRefs(props);

// form
const form = ref(null);

//  task data 
const title = ref('');
const valuePoints = ref('');
const description = ref('');

// to check if we're creating a new task or updating a current task 
const isUpdate = ref(false);

const performAction = async () => {

  // get form
  const formResponse = await form.value.validate();

  console.log(formResponse)

  // validate form
  if (!formResponse.valid) { return; }

  if (isUpdate.value) {

    // Update task
    emit("onSubmit", {
      title: title.value,
      description: description.value,
      value: valuePoints.value,
      taskId: data.value._id
    });

  } else {

    // create task
    emit("onSubmit", {
      title: title.value,
      description: description.value,
      value: valuePoints.value
    });
  }

};

onMounted(() => {

  // Update task info in modal if there is data
  if (data.value && data.value._id) {
    title.value = data.value.title;
    valuePoints.value = data.value.value;
    description.value = data.value.description;
    isUpdate.value = true;
  }

});
</script>
