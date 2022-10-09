<template>
     <div class="widget-list">
      <div 
      v-for="widget in list"
      :key="widget.type"
      class="widget"
      draggable="true"
       @mousedown="(e)=> $emit('onWidgetMouseDown',e,widget)"
      >
      {{widget.label}}
      </div>
    </div>
</template>



<script>
export default {
    //父——》子传递变量
    props:{
        list:Array,
    }

    //逻辑通过触发自定义事件传递
}
</script>

<style>

</style>