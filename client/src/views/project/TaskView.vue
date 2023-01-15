<template>
    <v-main>
        <v-container class="py-8 px-6" fluid>
            <v-row>
                <v-col cols="12">
                    <h1>{{ title }}</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="4">
                    <v-text-field v-model.trim="searchTaskInput" clearable label="Search" prepend-icon="mdi-magnify"
                        variant="underlined"></v-text-field>
                </v-col>

                <v-col cols="6" class="mt-3">
                    <!-- Create project btn with modal -->
                    <ButtonWithModal v-bind="createTaskButton" />
                </v-col>
                <v-col cols="2 mt-3">
                    <v-btn>Last 30 days</v-btn>
                </v-col>
            </v-row>

            <v-divider></v-divider>

            <!-- list of task -->
            <TaskList :filter-tearm="searchTaskInput" :list="tasks" />

        </v-container>
    </v-main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import ButtonWithModal from "@/components/button/ButtonWithModal.vue";
import TaskList from "@/components/task/TaskList.vue"
// import TaskList from "@/components/taks/TaskList.vue";

const createTask = (task) => {
    console.log(task);
};

const tasks = [{
    _id: "myRandomId",
    projectId: "someRandomProjectId",
    owner: "someRandomId12328y192",
    title: "Lavar Carro",
    description: "Por dentro y por fuera!",
    value: 3,
    points: [{ userId: "myuserid", value: 5 }],
    myPoints: 5,
    icon: "mdi-car-clock",
},
{
    _id: "myRandomId2",
    projectId: "someRandomProjectId",
    owner: "someRandomId12328y192",
    title: "Lavar Platos",
    description: "Incluyendo Hoyas!",
    value: 3,
    points: [{ userId: "myuserid", value: 5 }],
    myPoints: 10,
    color: '#E57373',
    icon: "mdi-silverware-clean"
},
{
    _id: "myRandomIdasd2",
    projectId: "someRandomProjectId",
    owner: "someRandomId12328y192",
    title: "Bañar los Perros",
    description: "Ambos!!",
    value: 3,
    points: [{ userId: "myuserid", value: 5 }],
    myPoints: 3,
    icon: "mdi-dog"
}];

const searchTaskInput = ref("");
const title = "Task";

// Create Task button
const createTaskButton = ref({
    title: "TASK",
    icon: "mdi-plus",
    action: createTask,
    template: "createTask",
    color: "success",
    variant: "tonal",
});

// const title = "Task";
onMounted(async () => {
    console.log("Taks view loaded");
});
</script>