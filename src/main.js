

import { createApp } from 'vue'
import VueDragResize from 'vue-drag-resize/src'
import App from './App.vue'
import ECharts from 'vue-echarts'
import { use } from "echarts/core"


// 手动引入 ECharts 各模块来减小打包体积
import {
    CanvasRenderer
  } from 'echarts/renderers'
  import {
    BarChart,
    LineChart
  } from 'echarts/charts'
  import {
    GridComponent,
    TooltipComponent
  } from 'echarts/components'
  
  use([
    CanvasRenderer,
    BarChart,
    LineChart,
    GridComponent,
    TooltipComponent
  ]);

const app = createApp(App);
app.component('Dragger',VueDragResize)
app.component('v-chart',ECharts)
app.mount('#app')
