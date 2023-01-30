<template>
  <v-container style="width: 100%; height:100%">

    <canvas v-if="!isEmpty" style="height:100%; width: 100%" id="DonutChartContainer"></canvas>

    <div v-if="!props.tasks || isEmpty" class="mt-10">
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
import { onMounted, defineProps, ref } from "vue";
import Chart from 'chart.js/auto';
import { sortByTerm } from "@/utils/Helpers";


const props = defineProps({
  tasks: Array,
});

const isEmpty = ref(false);


onMounted(() => {
  if (props.tasks) {
    const data = getPieData(props.tasks);

    if (!data || !data.length) {
      isEmpty.value = true;
      return;
    }

    createPieChart(data);
  }
});

const getPieData = (tasks) => {
  if (!tasks || !tasks.length) {
    return [];
  }

  const data = [];
  for (const task of tasks) {
    const label = task.title;
    // const taskPoint = task.value;
    const tasksPoints = task.points.map(taskPoints => taskPoints.value);
    const pointsCount = tasksPoints.reduce((current, acc) => current + acc, 0)

    data.push({ label: label, count: pointsCount / task.value })
  }

  return sortByTerm(data, 'count')
}

const createPieChart = (data, limit = 3) => {

  let labels = data.map(each => each.label);
  let count = data.map(each => each.count);

  if (labels.length > limit) {
    labels = labels.splice(0, limit);
    count = count.splice(0, limit);
  }

  const ctx = document.getElementById('DonutChartContainer');
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: count,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
      }]
    },
  });
}

</script>