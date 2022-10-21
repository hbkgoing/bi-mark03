<template>
  <a-layout>
    <a-layout-header style="background: #344b5c; height: 4vh; line-height: 4vh">
      <topTtool></topTtool>
    </a-layout-header>
    <a-layout>
      <a-layout-sider theme="light">
        <a-tabs v-model:activeKey="activeKey" centered>
          <a-tab-pane key="1">
            <template #tab>
              <span>
                <ordered-list-outlined style="margin: 0" />
                图层
              </span>
            </template>
            Tab 1
          </a-tab-pane>
          <a-tab-pane key="2">
            <template #tab>
              <span>
                <appstore-add-outlined style="margin: 0" />
                组件
              </span>
            </template>
          </a-tab-pane>
        </a-tabs>
      </a-layout-sider>
      <a-layout-content>
        <div style="height: 96vh; overflow: auto">
          <canvasRuler
            :vertical="false"
            :width="4550"
            :height="40"
            :style="style1"
          ></canvasRuler>
          <canvasRuler
            :vertical="true"
            :width="40"
            :height="4550"
            :style="style2"
          ></canvasRuler>

          <div class="content" :style="contentStyle"></div>
        </div>
      </a-layout-content>
      <a-layout-sider theme="light">
        <siderTool></siderTool>
      </a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { computed, ref } from "vue";
import {
  AppstoreAddOutlined,
  OrderedListOutlined,
} from "@ant-design/icons-vue";
import topTtool from "../components/top-tool/index.vue";
import BarChart from "../components/icons/charts/BarChart.vue";
import AreaChart from "../components/icons/charts/AreaChart.vue";
import WidgetList from "../components/widget-list/index.vue";
import siderTool from "../components/sider-tool/index.vue";
import canvasRuler from "../canvasRuler/index.vue";
import { assert } from "@vue/compiler-core";
const activeKey= ref("1");
const panelConfig={
    width:1920,
    height: 1080,
    bgImg:'src/assets/bg1.jpg',
}
let style1 = computed(() => {
  const hContainer = {
    left: "40px",
  };
  const vContainer = {
    top: "20px",
  };
  return hContainer;
});

let style2 = computed(() => {
  const hContainer = {
    left: "20px",
  };
  const vContainer = {
    top: "40px",
  };
  return vContainer;
});

let contentStyle = computed(() => {
    let style = {
        height : panelConfig.height+'px',
        width : panelConfig.width+"px",
        position: 'absolute',
        top: '40px',
        left : '40px',
        background: 'url('+ panelConfig.bgImg+')'
    }
    return style;
});
</script>

<style>
.top-tool {
  position: relative;
}

ul {
  padding: 0;
}
ul li {
  list-style-type: none;
}
</style>