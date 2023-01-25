<template>
  <v-container style="height:100%">

    <canvas style="height:100%; width: 100%" v-if="!isDataEmpty" id="BarChartContainer"></canvas>

    <div v-if="isDataEmpty" class="mt-10">
      <p class="text-h4">
        <v-icon icon="mdi-minus-circle" color="red" size="x-large"></v-icon>
      </p>
      <p>
        It looks you don't have enought data to analyse. <br>
        Keep working and come back later.
      </p>

    </div>

  </v-container>

</template>

<script setup>
import { onMounted, ref, defineProps } from "vue";
import { sortTaskPoints } from "@/utils/Helpers";
import Chart from "chart.js/auto";


const props = defineProps({
  tasks: Array,
});

const isDataEmpty = ref(false);

onMounted(async () => {

  if (props.tasks) {
    // get bar data
    const barData = calculateBarData(props.tasks);
    isDataEmpty.value = !barData.length;

    // if empty 
    if (!barData.length) {
      return;
    }

    // get data for char
    const data = barData.map((data) => data.value);
    const labels = barData.map((data) => data.label);

    //  create char
    createChart(data, labels);
  }
});

const calculateBarData = (tasks, limit = 6) => {
  // exit if not task found
  if (!tasks || !tasks.length) {
    return [];
  }

  const data = [];
  for (const task of tasks) {
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
