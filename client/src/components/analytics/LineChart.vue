<template>

  <v-container style="width: 100%; height:100%">

    <canvas v-show="!isEmpty" style="height:100%; width: 100%" id="LineChartContainer"></canvas>

    <div v-show="!props.tasks || isEmpty" class="mt-10">
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

const props = defineProps({
  tasks: Array,
});

const isEmpty = ref(false);

onMounted(() => {
  if (props.tasks) {
    const data = getLineData(props.tasks);

    if (!data || !data.length) {
      isEmpty.value = true;
      return;
    }

    createLineChart(data);
  }

});

const getLineData = () => {

  return [];
};

const createLineChart = () => {

  const ctx = document.getElementById('LineChartContainer');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["Jan 1", "Jan 5", "Jan 10", "Jan 15", "Jan 20", "Jan 25", "Jan 31"],
      datasets: [{
        label: 'rauleldomi',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    }, options: {
      responsive: true,
      maintainAspectRatio: false,
    }
  });
}

</script>