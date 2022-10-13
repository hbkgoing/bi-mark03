export const WIDGET_LIST=[
    {
        type:'text',
        label:'文本',
        icon:'fa fa-file-text-o',
        component: 'custom-text',
        img:'https://aliyuncdn.antdv.com/vue.png',
        default:{
          w:200,
          h:100,
        },
      },
      {
        type:'area-chart',
        label:'面积图',
        icon:'fa fa-area-chart',
        component: 'area-chart',
        default:{
          w:200,
          h:200,
        },
      },
      {
        type:'bar-chart',
        label:'柱状图',
        icon:'fa fa-bar-chart',
        component: 'bar-chart',
        default:{
          w:200,
          h:150,
        },
      },
      {
        type:'video',
        component: 'custom-video',
        icon:'fa fa-file-video-o',
        label:'视频',
        default:{
          w:150,
          h:200,
        },
      }
]