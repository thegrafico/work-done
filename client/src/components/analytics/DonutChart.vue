<template>
  <canvas id="DonutChartContainer"></canvas>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('DonutChartContainer');
  new Chart(ctx, {
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
})

</script>