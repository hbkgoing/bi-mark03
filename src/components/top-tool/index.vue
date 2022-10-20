<template>
    
      <a-tooltip placement="bottom">
            <template #title>
              <span>撤销</span>
            </template>
            <a-button @click="undoChange" type="link" title="撤回"
              ><Undo></Undo>
            </a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
            <template #title>
              <span>恢复</span>
            </template>
            <a-button @click="reDoChange" type="link" title="恢复"
              ><Redo></Redo>
            </a-button>
          </a-tooltip>
          <a-tooltip placement="bottom">
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
          </a-tooltip>
</template>

<script setup>
import Undo from "../icons/IconUndo.vue";
import Redo from "../icons/IconRedo.vue"
import Save from "../icons/top-tool/IconSave.vue"
import Preview from "../icons/top-tool/IconPreview.vue"
</script>

<style>

</style>