<template>
  <v-container class="border" style="width: 100%; height:100%">

    <canvas style="height:100%; width: 100%" id="DonutChartContainer"></canvas>

    <div v-if="!props.tasks" class="mt-10">
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
import { onMounted, defineProps } from "vue";
import Chart from 'chart.js/auto';

const props = defineProps({
  tasks: Array,
});


onMounted(() => {
  if (props.tasks) {
    const data = getPieData(props.tasks);
    console.log("task:", data)
    createPieChart();
  }
});

const getPieData = (tasks) => {
  if (!tasks || !tasks.length) {
    return [];
  }

  const data = tasks.map(task => { return { "label": task.title, "value": task.points.length } });
  console.log(data);



  return [];
}

const createPieChart = () => {
  const ctx = document.getElementById('DonutChartContainer');
  return new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
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