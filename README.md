# bi-mark03

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


todo:

1.从widget-list拖拽一个widget到 panel中 ，需要选中当前这个widget。
2.左击widget====》选中focused，其他widget focused：false。 
    这里发现一个问题，当dragger在一个选中状态时，鼠标点击其他地方，dragger还是显示为active状态，但是拖动不了。
    :解决办法，利用dragger的deactivated事件来取消选中属性。
3.右击widget====》选中focused，弹出context-Menu，其他widget focused：false。

4.图层设置，调整dragger的z-index；一个dragger一个图层，当多个图层的时候，那么z-index就是 0，1，2，3，4，5；每一层就是一个dragger。
 一个有序的列表，curLevel，最大值那么不能再向上，最小值那么不能再向下。
 下移操作：curLevel curLevel-1；调换位置。 上移操作：curLevel curlevel+1；调换位置。
 置顶操作：curLevel >> max; [curLevel,max]这个区间的所有level-1； 置底操作：curLevel >> min [min,curLevel]这个区间的所有level+1；
 删除图层操作：curLevel ; [curLevel,max]这个区间的所有level-1；

6.需要一个上、左的网格线

 


bi-mark03主要功能：
    元素自由拖拽，放大，缩小，旋转
    可添加图片，文本，矩形，背景。多种编辑功能（字体，背景，大小，边距等）
    组件自动吸附，实时参考线（组件可以和画布，自定义参考线以及其他组件进行自动吸附对齐，并显示实时参考线，拖动过程中按下 alt 键可暂时关闭）
    **标尺，参考线，可自定义参考线（在标尺上点击即可生成参开线，可拖动参考线更改位置，双击删除参考线）**
    撤销，重做（支持快捷键，可配置撤销的步数）
    **组件复制，粘贴，锁定，隐藏等**
    ctrl + 拖动组件可快速复制组件
    右键菜单，菜单可配置，可针对组件当前状态灵活生成（即不同的组件可产生不同的菜单）
    图层面板，可拖拽更改组件图层，可重命名，可在图层面板快速锁定，删除，隐藏组件
    同时选中多组件（按 ctrl + 左键），可进行多组件对齐
    数据备份，通过 indexDB 数据库保存在本地（可自动备份，手动备份），并可从备份中恢复数据
    一键生成 h5 代码
    编辑画布大小
    多种快捷键
    设置中心，可设置撤销功能，备份功能等
    可通过插件系统二次开发





    bug：在vue2中可以使用native来给组件传递原生事件，但是native在vue3中已经移除了。

todo:
  编辑器->撤销，反撤销

v2:

![image](https://cdn.staticaly.com/gh/hbkgoing/blog_imgs@master/20210423/image.7imjcc4tk440.webp)
 





    