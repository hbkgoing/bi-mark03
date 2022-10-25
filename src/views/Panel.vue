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
            <widget-list @onWidgetMouseDown="onWidgetMouseDown"></widget-list>
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

          <div
            @dragover.prevent
            @drop="onDrop"
            class="content"
            :style="contentStyle"
          >
            <Dragger
              v-for="item in list.panelList"
              ref="widget"
              :key="item.id"
              :onDrag="onDragCallback"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :z="item.z"
              :h="item.h"
              :isActive="item.focused"
              @contextmenu.prevent.stop="handleClick($event, item)"
            >
              <component :is="item.component" @onDrop="onDrop($event, i)" />
            </Dragger>

          </div>
        </div>
      </a-layout-content>
      <a-layout-sider theme="light">
        <siderTool></siderTool>
      </a-layout-sider>
    </a-layout>
  </a-layout>


  <vue-simple-context-menu
    element-id="myUniqueId"
    :options="options"
    options.type="divider"
    options.class="custom-class"
    ref="vueSimpleContextMenu"
    @option-clicked="optionClicked"
  />
</template>

<script >
import { ref } from "vue";
import {
  AppstoreAddOutlined,
  OrderedListOutlined,
} from "@ant-design/icons-vue";
import topTtool from "../components/top-tool/index.vue";
import BarChart from "../components/widgets-component/bar-chart/index.vue";
import AreaChart from "../components/widgets-component/area-chart/index.vue";
import CustomText from "../components/widgets-component/custom-text/index.vue"
import WidgetList from "../components/widget-list/index.vue";
import CustomVideo from "../components/widgets-component/custom-video/index.vue";
import siderTool from "../components/sider-tool/index.vue";
import canvasRuler from "../canvasRuler/index.vue";
import { assert } from "@vue/compiler-core";
import { panelList } from "../stores/panelList";
import { useUndoStore } from "../stores/undoList"
import VueSimpleContextMenu from "vue-simple-context-menu";
import "vue-simple-context-menu/dist/vue-simple-context-menu.css";
import "font-awesome/css/font-awesome.min.css";
let currentId = 0;
let widgetX = 0;
let widgetY = 0;
let currentWidget = null;

const panelConfig = {
  width: 1920,
  height: 1080,
  bgImg: "src/assets/bg1.jpg",
};

export default {
  data() {
    return {
      list: panelList(),
      undoList:useUndoStore(),
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
    siderTool,
    canvasRuler,
    topTtool,
    CustomText,
    CustomVideo,
    VueSimpleContextMenu,
    AppstoreAddOutlined,
    OrderedListOutlined
  },

  computed: {
    style1() {
      const hContainer = {
        left: "40px",
      };
      return hContainer;
    },
    style2() {
      const vContainer = {
        top: "40px",
      };
      return vContainer;
    },

    contentStyle() {
      let style = {
        height: panelConfig.height + "px",
        width: panelConfig.width + "px",
        // position: "absolute",
        top: "40px",
        left: "40px",
        background: "url(" + panelConfig.bgImg + ")",
      };
      return style;
    },
  },

  methods: {

    optionClicked(event) {
      //从list中找到最大的z；
      let maxZ = Math.max(...this.list.panelList.map((e) => e.z));
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
      // this.sortLayerList();
      // this.undoList.push(this.list);
    },

     //鼠标右键点击事件
    handleClick(event, item) {
      for (const el of this.list.panelList) {
        if (item.id === el.id) {
          el.focused = true;
        } else {
          el.focused = false;
        }
      }
      this.$refs.vueSimpleContextMenu.showMenu(event, item);
      console.log(this.$refs.vueSimpleContextMenu)
    },

    onDragCallback(x,y){
        //如果x,y超出了画布的长、宽，取消拖动
        const curWidget = this.list.panelList.find(item=> item.focused==true)
        if(x<0|| y<0 || x>panelConfig.width-curWidget.w || y>panelConfig.height-curWidget.h){
            return false;
        }
    },

    onDrop(e) {
      //放置widget
      let x = e.offsetX - widgetX;
      let y = e.offsetY - widgetY;
      //   if (i !== undefined) {
      //     const currentWidget = this.$refs["widget"][i].$el;
      //     x = e.offsetX + currentWidget.offsetLeft - widgetX;
      //     y = e.offsetY + currentWidget.offsetTop - widgetY;
      //   }

      console.log(this.list.panelList);

      for (const item of this.list.panelList) {
        item.focused = false;
      }
      let el = {
        id: currentId++,
        //e.offset 就是拖拽的位置
        // x: e.offsetX - widgetX, 这里有个bug，
        // y: e.offsetY - widgetY,
        x,
        y,
        icon: currentWidget.icon,
        w: currentWidget.default.w,
        h: currentWidget.default.h,
        // z: currentZ++,如果现在这么定义，那么在回显的时候就会有问题了。currentZ会丢失状态。
        z:
          this.list.panelList.length === 0
            ? 0
            : Math.max(...this.list.panelList.map((e) => e.z)) + 1,
        label: currentWidget.label,
        component: currentWidget.component,
        //widget获取焦点
        focused: true,
      };
      this.list.$patch({ panelList: [...this.list.panelList, el] });
      this.undoList.$patch({value:[...this.undoList.value,this.list.panelList]})
      console.log(111,this.undoList.value)
    },

    onWidgetMouseDown(e, widget) {
      widgetX = e.offsetX;
      widgetY = e.offsetY;
      currentWidget = widget;
    },
  },
};

// const activeKey = ref("1");

// // const barChart= ref(BarChart)

// const list1 = reactive([
// {
//     "id": 0,
//     "x": 263,
//     "y": 91,
//     "icon": "fa fa-file-text-o",
//     "w": 200,
//     "h": 100,
//     "z": 1,
//     "label": "文本",
//     "component": "bar-chart",
//     "focused": false
// },
// {
//     "id": 1,
//     "x": 263,
//     "y": 91,
//     "icon": "fa fa-file-text-o",
//     "w": 200,
//     "h": 100,
//     "z": 2,
//     "label": "文本",
//     "component": "bar-chart",
//     "focused": false
// },
// ]);
// let currentId = 0;
// let widgetX = 0;
// let widgetY = 0;
// let currentWidget = null;
// const list = panelList();
// const panelConfig = {
//   width: 1920,
//   height: 1080,
//   bgImg: "src/assets/bg1.jpg",
// };
// let style1 = computed(() => {
//   const hContainer = {
//     left: "40px",
//   };
//   const vContainer = {
//     top: "20px",
//   };
//   return hContainer;
// });

// let style2 = computed(() => {
//   const hContainer = {
//     left: "20px",
//   };
//   const vContainer = {
//     top: "40px",
//   };
//   return vContainer;
// });

// let contentStyle = computed(() => {
//   let style = {
//     height: panelConfig.height + "px",
//     width: panelConfig.width + "px",
//     position: "absolute",
//     top: "40px",
//     left: "40px",
//     background: "url(" + panelConfig.bgImg + ")",
//   };
//   return style;
// });

// const onDrop = (e) => {
//   //放置widget
//   let x = e.offsetX - widgetX;
//   let y = e.offsetY - widgetY;
// //   if (i !== undefined) {
// //     const currentWidget = this.$refs["widget"][i].$el;
// //     x = e.offsetX + currentWidget.offsetLeft - widgetX;
// //     y = e.offsetY + currentWidget.offsetTop - widgetY;
// //   }

// console.log(list.panelList)

//   for (const item of list.panelList) {
//     item.focused = false;
//   }
//   let el = {
//     id: currentId++,
//     //e.offset 就是拖拽的位置
//     // x: e.offsetX - widgetX, 这里有个bug，
//     // y: e.offsetY - widgetY,
//     x,
//     y,
//     icon: currentWidget.icon,
//     w: currentWidget.default.w,
//     h: currentWidget.default.h,
//     // z: currentZ++,如果现在这么定义，那么在回显的时候就会有问题了。currentZ会丢失状态。
//     z: list.panelList.length === 0 ? 0 : Math.max(...list.panelList.map((e) => e.z)) + 1,
//     label: currentWidget.label,
//     component: currentWidget.component,
//     //widget获取焦点
//     focused: true,
//   };
//   list.$patch({ panelList: [...list.panelList,el] });
// };

// const onWidgetMouseDown = (e, widget) => {
//   widgetX = e.offsetX;
//   widgetY = e.offsetY;
//   currentWidget = widget;
// };
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

.my-custom-class {
  font-size: 12px;
}
</style>