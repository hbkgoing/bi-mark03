<template>
  <a-tabs centered v-model:activeKey="activeKey">
    <a-tab-pane key="1">
      <template #tab>
        <span>
            <!-- <home-outlined style="margin:0"/> -->
          屏幕
        </span>
      </template>
      屏幕设置
    </a-tab-pane>
    <a-tab-pane key="2">
      <template #tab>
        <span>
          <android-outlined />
          组件
        </span>
      </template>
      
    </a-tab-pane>
    <a-tab-pane key="3">
      <template #tab>
        <span>
            <!-- <home-outlined style="margin:0"/> -->
         数据
        </span>
      </template>
      Tab 1
    </a-tab-pane>
  </a-tabs>
</template>

<script setup>
import {
  AppstoreAddOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
import { defineComponent, ref } from 'vue';
activeKey: ref("1")

</script>

<style>
</style>