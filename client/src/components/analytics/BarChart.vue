<template>
  <canvas v-if="!loading" id="BarChartContainer"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import { useTaskStore } from "@/stores/tasks.store";
import { storeToRefs } from "pinia";
import { sortTaskPoints } from "@/utils/Helpers";
import Chart from "chart.js/auto";

const { tasks, loading } = storeToRefs(useTaskStore());
const { loadTasks } = useTaskStore();

onMounted(async () => {
  // load task in order to do the analysis
  await loadTasks();

  console.log(tasks);

  const barData = calculateBarData();

  const data = barData.map((data) => data.value);
  console.log(data);
  const labels = barData.map((data) => data.label); //['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  createChart(data, labels);
});

const calculateBarData = (limit = 6) => {
  // exit if not task found
  if (!tasks.value || !tasks.value.length) {
    return [];
  }

  const data = [];
  for (const task of tasks.value) {
    const label = task.title;

    // How many points each task has 
    const pointsAmountPerTask = task.points
      .map((each) => each.value)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    if (pointsAmountPerTask > 0) {
      data.push({ label, value: pointsAmountPerTask });
    }
  }

  // if not data is available
  if (!data.length) {
    return [];
  }

  // Do I need to sort? the chart seems very weird to me
  const sortedData = sortTaskPoints(data);

  // return only some of the task not all of then since the plot will be ugly if so.
  if (sortedData.length > limit) {
    return sortedData.slice(0, limit + 1);
  }

  return sortedData;
};

const createChart = (cdata, clabels, title = "Task Done (Points)") => {
  const ctx = document.getElementById("BarChartContainer");
  new Chart(ctx, {
    type: "bar",
    data: {
      labels: clabels,
      datasets: [
        {
          label: title,
          data: cdata,
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
</script>
