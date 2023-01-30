<template>
  <v-container fluid>

    <v-sheet elevation="8">
      <!-- Header -->
      <v-row class="header border">
        <v-col cols="1">
          <p></p>
        </v-col>

        <v-col cols="4">
          <p>User</p>
        </v-col>

        <v-col cols="2">
          <p>Overall Points</p>
        </v-col>

        <v-col cols="3">
          <p>Status</p>
        </v-col>


        <v-col cols="2">
          <p>Options</p>
        </v-col>

      </v-row>
    </v-sheet>

    <!-- Body -->
    <v-container class="tableBody fluid px-0 mt-10">
      <v-sheet elevation="4">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                    64
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">username</p>
                  <p class="gray pa-0">
                    added: M/D/Y
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="2">
            <p class="points">150</p>
          </v-col>

          <v-col cols="3">
            <v-switch label="Active" color="success" :model-value="true" hide-details></v-switch>
          </v-col>


          <v-col cols="2">

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-col>

        </v-row>

      </v-sheet>

      <v-sheet elevation="4">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                    64
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">username</p>
                  <p class="gray pa-0">
                    added: M/D/Y
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="2">
            <p class="points">150</p>
          </v-col>

          <v-col cols="3">
            <v-switch label="Active" color="success" :model-value="true" hide-details></v-switch>
          </v-col>


          <v-col cols="2">

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-col>

        </v-row>

      </v-sheet>

      <v-sheet elevation="4">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                    64
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">username</p>
                  <p class="gray pa-0">
                    added: M/D/Y
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="2">
            <p class="points">150</p>
          </v-col>

          <v-col cols="3">
            <v-switch label="Active" color="success" :model-value="true" hide-details></v-switch>
          </v-col>


          <v-col cols="2">

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-col>

        </v-row>

      </v-sheet>

      <v-sheet elevation="4">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                    64
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">username</p>
                  <p class="gray pa-0">
                    added: M/D/Y
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="2">
            <p class="points">150</p>
          </v-col>

          <v-col cols="3">
            <v-switch label="Active" color="success" :model-value="true" hide-details></v-switch>
          </v-col>


          <v-col cols="2">

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-col>

        </v-row>

      </v-sheet>

      <v-sheet elevation="4">

        <v-row class="mb-10 px-2" align="center">
          <v-col cols="1">
            <v-checkbox color="info" value="info" hide-details></v-checkbox>
          </v-col>

          <v-col cols="4">
            <v-container fluid>
              <v-row align="center">
                <v-col cols="4" class=" pa-0 ma-0">
                  <v-avatar color="info" size="x-large">
                    64
                  </v-avatar>
                </v-col>
                <v-col cols="8" class="userinfo pa-0 ma-0">
                  <p class="username pa-0">username</p>
                  <p class="gray pa-0">
                    added: M/D/Y
                  </p>
                </v-col>
              </v-row>
            </v-container>

          </v-col>

          <v-col cols="2">
            <p class="points">150</p>
          </v-col>

          <v-col cols="3">
            <v-switch label="Active" color="success" :model-value="true" hide-details></v-switch>
          </v-col>


          <v-col cols="2">

            <v-btn icon="mdi-dots-vertical"></v-btn>
          </v-col>

        </v-row>

      </v-sheet>




    </v-container>
  </v-container>

</template>

<style scoped>
.header {
  background-color: white;
  border-radius: 10px;
  padding-top: .5em;
  padding-bottom: .5em;
}

.br {
  border-radius: 10px !important;
}

.tableBody p {
  color: black;
}

.points {
  font-weight: bolder;
}

.username {
  color: black;
  font-weight: bold;
  font-size: 0.9em;
}

.userinfo {
  position: relative;
  left: -10%;
}

.gray {
  color: gray !important;
  font-style: italic;
}

.header p {
  font-weight: bolder;
  color: rgba(0, 0, 0, 0.5);
  font-size: 1.15em;
  text-align: left;
}
</style>
<script setup>
</script>