<template>
  <!-- 容器 -->
  <div id="app">
    <a-layout>
      <a-layout-header
        style="
          height: 30px;
          font-size: 12px;
          text-align: center;
          line-height: 30px;
          color: #c3baba;
        "
      >
        BI-Mark03
      </a-layout-header>
      <a-layout>
        <a-layout-sider>
          <!-- 左边图表list -->
          <a-tabs centered class="sider" v-model:activeKey="activeKey">
            <a-tab-pane key="1" tab="图层">
              <draggable
                @change="sortChange"
                v-model="list"
                :component-data="{ name: 'fade', type: 'transtion-group' }"
                item-key="id"
              >
                <template #item="{ element }">
                  <div class="layer">{{ element.label }}</div>
                </template>
              </draggable>
            </a-tab-pane>
            <a-tab-pane key="2" tab="组件" force-render>
              <widget-list
                style="margin-left: 20px"
                :list="widgetList"
                @onWidgetMouseDown="onWidgetMouseDown"
              />
            </a-tab-pane>
          </a-tabs>
        </a-layout-sider>
        <a-layout-content>
          <!-- 右边的画布 -->
          <div class="panel" ref="panel" @dragover.prevent @drop="onDrop">
            <Dragger
              v-for="(item, i) in list"
              ref="widget"
              :key="item.id"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :z="item.z"
              :h="item.h"
              :isActive="item.focused"
              @clicked="onActivated(e, item)"
              @deactivated="onDeactivated(e, item)"
              @contextmenu.prevent.stop="handleClick($event, item)"
              class="box"
            >
              <component :is="item.component" @onDrop="onDrop($event, i)" />
            </Dragger>
          </div>
        </a-layout-content>
        <a-layout-sider style="background-color: aliceblue">
          <a-tabs centered class="sider" v-model:activeKey1="activeKey1">
            <a-tab-pane key="1" tab="配置"> </a-tab-pane>
          </a-tabs>
        </a-layout-sider>
      </a-layout>
    </a-layout>
  </div>

  <vue-simple-context-menu
    element-id="myUniqueId"
    :options="options"
    options.type="divider"
    options.class="custom-class"
    ref="contextMenu"
    @option-clicked="optionClicked"
  />
</template>

<script>
let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;

import WidgetList from "./components/widget-list";
import * as CONFIG from "./constants/config";
import BarChart from "./components/bar-chart";
import AreaChart from "./components/area-chart";
import CustomText from "./components/custom-text";
import CustomVideo from "./components/custom-video";
//鼠标右击菜单
import VueSimpleContextMenu from "vue-simple-context-menu";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import "font-awesome/css/font-awesome.min.css";
import { ref } from "vue";
import draggable from "vuedraggable";

export default {
  name: "App",

  setup() {
    return {
      activeKey: ref("1"),
    };
  },

  //参与渲染的数据
  data() {
    return {
      drag: false,
      list: [],
      widgetList: CONFIG.WIDGET_LIST,
      options: [
        {
          name: "<i class='fa fa-sort-amount-asc'></i> 置顶",
          class: "my-custom-class",
          method: "moveTop",
        },
        {
          name: "<i class='fa fa-sort-amount-desc'></i> 置底",
          class: "my-custom-class",
          method: "moveBottom",
        },
        {
          name: "<i class='fa fa-long-arrow-up'></i> 上移图层",
          class: "my-custom-class",
          method: "moveUp",
        },
        {
          name: "<i class='fa fa-long-arrow-down'></i> 下移图层",
          class: "my-custom-class",
          method: "moveDown",
        },
        {
          name: "<i class='fa fa-trash'></i> 删除",
          class: "my-custom-class",
          method: "remove",
        },
      ],
    };
  },

  components: {
    WidgetList,
    BarChart,
    AreaChart,
    CustomText,
    CustomVideo,
    VueSimpleContextMenu,
    draggable,
  },
  methods: {
    sortLayerList() {
      this.list.sort((a, b) => b.z - a.z);
    },

    //拖拽图层改变后，改变list中item.z
    //list中z的排序是不间隔的数字从0开始
    //dragger事件改变了list中item的索引
    sortChange() {
      //按照所以来改变z
      let len = this.list.length - 1;
      this.list.forEach((item, i) => {
        item.z = len - i;
      });
    },

    //鼠标右键点击事件
    handleClick(event, item) {
      for (const el of this.list) {
        if (item.id === el.id) {
          el.focused = true;
        } else {
          el.focused = false;
        }
      }
      this.$refs.contextMenu.showMenu(event, item);
    },

    optionClicked(event) {
      //从list中找到最大的z；
      let maxZ = Math.max(...this.list.map((e) => e.z));
      let currentZ = event.item.z;
      this.list = this.list.sort((o1, o2) => {
        return o1.z - o2.z;
      });
      switch (event.option.method) {
        case "moveTop":
          // 置顶
          if (maxZ === currentZ) {
            window.alert("已经是最顶层了！");
            break;
          }
          for (const item of this.list) {
            if (item.z === currentZ) {
              item.z = maxZ;
              continue;
            }
            if (item.z > currentZ) {
              item.z--;
            }
          }
          break;
        case "moveBottom":
          // 置底
          for (const item of this.list) {
            if (0 === currentZ) {
              window.alert("已经是最底层了！");
              break;
            }
            if (item.z < currentZ) {
              item.z++;
              continue;
            }
            if (item.z === currentZ) {
              item.z = 0;
            }
          }
          break;
        case "moveUp":
          if (maxZ === currentZ) {
            window.alert("已经是最顶层了！");
            break;
          }
          this.list[currentZ].z = currentZ + 1;
          this.list[currentZ + 1].z = currentZ;
          break;

        case "moveDown":
          if (0 === currentZ) {
            window.alert("已经是最底层了！");
            break;
          }
          this.list[currentZ].z = currentZ - 1;
          this.list[currentZ - 1].z = currentZ;
          break;
        case "remove":
          this.list.splice(currentZ, 1);
          for (const item of this.list) {
            if (item.z > currentZ) {
              item.z--;
            }
          }
          break;
      }
      this.sortLayerList();
    },

    //单击widget事件
    //todo: bug 点击事件执行第一次没有获取到焦点，第二次才获取到焦点
    onActivated(e, item) {
      for (const el of this.list) {
        if (item.id === el.id) {
          el.focused = true;
        } else {
          el.focused = false;
        }
      }
    },

    //dragger未选中状态
    onDeactivated() {
      //鼠标未点中dragger，展示未选中状态。
      for (const el of this.list) {
        el.focused = false;
      }
    },

    //放置widget
    onDrop(e, i) {
      let x = e.offsetX - widgetX;
      let y = e.offsetY - widgetY;
      if (i !== undefined) {
        const currentWidget = this.$refs["widget"][i].$el;
        x = e.offsetX + currentWidget.offsetLeft - widgetX;
        y = e.offsetY + currentWidget.offsetTop - widgetY;
      }

      for (const item of this.list) {
        item.focused = false;
      }
      let el = {
        id: currentId++,
        //e.offset 就是拖拽的位置
        // x: e.offsetX - widgetX, 这里有个bug，
        // y: e.offsetY - widgetY,
        x,
        y,
        w: currentWidget.default.w,
        h: currentWidget.default.h,
        // z: currentZ++,如果现在这么定义，那么在回显的时候就会有问题了。currentZ会丢失状态。
        z:
          this.list.length === 0
            ? 0
            : Math.max(...this.list.map((e) => e.z)) + 1,
        label: currentWidget.label,
        component: currentWidget.component,
        //widget获取焦点
        focused: true,
      };

      this.list.unshift(el);
    },

    //确定widget放置精准位置
    onWidgetMouseDown(e, widget) {
      widgetX = e.offsetX;
      widgetY = e.offsetY;
      currentWidget = widget;
    },
  },
};
</script>

<style>
body {
  margin: 0;
}
#app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.sider {
  height: 100%;
  width: 200px;
  background-color: aliceblue;
  align-content: center;
}

.widget {
  height: 100px;
  width: 100px;
  outline: 1px solid red;
  font-size: 20px;
  text-align: center;
  margin: 40;
}

.panel {
  height: 100%;
  flex: 1;
  background-color: white;
  position: relative;
}

.my-custom-class {
  font-size: 12px;
}

.box {
  outline: 1px solid blue;
  position: absolute;
}

.layer {
  height: 50px;
  width: 100%;
  background-color: aliceblue;
}

.layer:hover {
  background-color: gray;
}
</style>
