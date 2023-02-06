<template>

    <div class="overflow-y-auto px-4" style="height: 70vh;">
        <v-row class="pt-4" v-if="!loading">
            <v-col cols="7">
                <v-sheet align="center" elevation="8" height="30vh" class="pa-2">
                    <BarChart :tasks="tasks" />
                </v-sheet>
            </v-col>
            <v-col cols="5">
                <v-sheet align="center" elevation="8" height="30vh" class="pa-2">
                    <DonutChart :tasks="tasks" />
                </v-sheet>
            </v-col>
        </v-row>

        <v-row class="pt-4">
            <v-col cols="12">
                <v-sheet align="center" elevation="8" height="30vh" class="pa-2">
                    <LineChart :tasks="tasks"/>
                </v-sheet>
            </v-col>

        </v-row>
    </div>

</template>


<script setup>
import BarChart from "@/components/analytics/BarChart.vue";
import DonutChart from "@/components/analytics/DonutChart.vue";
import LineChart from "@/components/analytics/LineChart.vue";
import { onMounted } from "vue";
import { useTaskStore } from "@/stores/tasks.store";
import { storeToRefs } from "pinia";


const { tasks, loading } = storeToRefs(useTaskStore());
const { loadTasks } = useTaskStore();


onMounted(async () => {
    await loadTasks();
});

</script>
