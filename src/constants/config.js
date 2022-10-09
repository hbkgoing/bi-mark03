export const WIDGET_LIST=[
    {
        type:'text',
        label:'文字',
        component: 'custom-text',
        default:{
          w:200,
          h:200,
        },
      },
      {
        type:'area-chart',
        label:'面积图',
        component: 'area-chart',
        default:{
          w:200,
          h:200,
        },
      },
      {
        type:'bar-chart',
        label:'柱状图',
        component: 'bar-chart',
        default:{
          w:200,
          h:150,
        },
      },
      {
        type:'video',
        component: 'custom-video',
        label:'视频',
        default:{
          w:150,
          h:200,
        },
      }
]