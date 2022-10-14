 <template>
  <div class="panel-item">
    <i :class="item.icon" class="icon" :title="item.label" />
    <input
      v-if="isEditing"
      v-model="rename"
      v-clickoutside="saveName"
      type="text"
      class="name"
      ondragstart="return false"
      @keydown.enter="saveName"
    />
    <div v-else class="name">
      {{ item.label }}
    </div>

    

    <!-- 操作按钮 -->
    <div class="handle">
      <i
        class="fa fa-trash-o remove"
        :title="item.lock ? '已锁定，无法删除' : '删除'"
        @click.stop="remove"
      />
    </div>
  </div>
</template>

<script>
export default {
  //父——》子传递变量
  props: {
    item: String,
  },

  data() {
    return {
      isEditing: false,
    };
  },
};
</script>

<style>
.panel-item {
  box-sizing: border-box;
  padding: 0 20px;
  height: 36px;
  display: flex;
  align-items: center;
  @include no-wrap;
  font-size: 14px;
  background-color: #252930;
  border-bottom: 1px solid #1d2024;
  cursor: pointer;
  /* transition: 0.2s; */
  color: #9099a4;
  border-left: 2px solid transparent;
}
.panel-item:hover {
  background-color: #404955;
  color: #fff;
}
.panel-item .icon {
  padding-right: 4px;
}
.panel-item .name {
  width: 1px;
  flex: 1;
  @include no-wrap;
}

.panel-item .handle .remove {
  
}

.panel-item .handle .remove:hover {
  color: red;
}
</style>