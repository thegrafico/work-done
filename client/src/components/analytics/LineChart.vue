<template>
  <canvas id="LineChartContainer" disabled></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('LineChartContainer');
  new Chart(ctx, {
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
})

</script>