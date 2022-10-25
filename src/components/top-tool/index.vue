<template>
  <a-tooltip placement="bottom">
    <template #title>
      <span>撤销</span>
    </template>
    <a-button @click="undoChange" type="link" title="撤回"
      ><UndoIcon></UndoIcon>
    </a-button>
  </a-tooltip>
  <a-tooltip placement="bottom">
    <template #title>
      <span>恢复</span>
    </template>
    <a-button @click="reDoChange" type="link" title="恢复"
      ><RedoIcon></RedoIcon>
    </a-button>
  </a-tooltip>
  <!-- <a-tooltip placement="bottom">
            <template #title>
              <span>保存</span>
            </template>
            <a-button @click="save" type="link" title="保存"
              ><Save></Save>
            </a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>预览</span>
            </template>
            <a-button @click="preview" type="link" title="预览"
              ><Preview></Preview>
            </a-button>
          </a-tooltip> -->
</template>

<script setup>
import UndoIcon from "../icons/IconUndo.vue";
import RedoIcon from "../icons/IconRedo.vue";
// import SaveIcon from "../icons/top-tool/IconSave.vue";
// import PreviewIcon from "../icons/top-tool/IconPreview.vue";
import { useUndoStore } from "../../stores/undoList";
import { panelList } from "../../stores/panelList";

const undoStore = useUndoStore();
const panel = panelList();

const undoChange = () => {
  console.log(1111)
  let lasted = undoStore.value.length - 1;
  let firstList = undoStore.value[lasted];
  if (firstList.length == 0) {
        window.alert("无法撤销！");
        return;
      }
  undoStore.spliceLatest();
  panel.$patch({panelList:JSON.parse(JSON.stringify(undoStore.value[lasted-1]))})
};
</script>

<style>
</style>