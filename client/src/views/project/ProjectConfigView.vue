<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>

      <v-row class="mb-10">
        <v-col cols="12">
          <h1>
            Config
          </h1>
        </v-col>
      </v-row>
      <!-- list of task -->


      <v-row>
        <v-col cols="12">
          <h3>General</h3>
        </v-col>
        <v-divider></v-divider>

      </v-row>
      <v-row>
        <v-col cols="4">
          <v-text-field label="Name" model-value="Project Name"></v-text-field>
        </v-col>

        <v-col cols="4" class="mt-3">
          <v-btn variant="flat" color="primary">
            Save Changes
          </v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-list-subheader>Suffix for weight</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field label="Weight" model-value="28.00" suffix="lbs"></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-list-subheader>Suffix for email domain</v-list-subheader>
        </v-col>

        <v-col cols="8">

        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-list-subheader>Suffix for time zone</v-list-subheader>
        </v-col>

        <v-col cols="8">
          <v-text-field label="Label Text" model-value="12:30:00" type="time" suffix="PST"></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>



</script>