import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import App from './App.vue'
import router from './router'
import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue'
import 'vue-draggable-resizable/src/components/vue-draggable-resizable.css'
// optionally import default styles
import ECharts from 'vue-echarts'
import { use } from "echarts/core"

// import ECharts modules manually to reduce bundle size
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
    LineChart,
    BarChart,
    GridComponent,
    TooltipComponent
  ])
  


import './assets/main.css'

const app = createApp(App)
app.component('Dragger',VueDraggableResizable)
// register globally (or you can do it locally)
app.component('v-chart', ECharts)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.mount('#app')
