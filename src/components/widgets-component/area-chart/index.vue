<template>
    <v-chart 
    class="chart" :option="option" autoresize />
  </template>
  
  
  
  
  <script>
  export default {
  
   methods:{
    
   },
  
    props:{
      index:String,
    },
    data() {
      return {
        option: {
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              type: "line",
              areaStyle: {},
            },
          ],
        },
      };
    },
  };
  </script>
  
  <style>
  </style>