//绘制左标尺方法
export const drawVerticalRuler = (ctx) => {

    ctx.lineWidth = 0.1;
    //设置样式
    //   ctx.textBaseline = 'middle';
    ctx.beginPath()
    for (var i = 0; i < 193; i++) {
        ctx.moveTo(1, i * 10 + 0.5);
        console.log(i * 10 + 0.5)
        if (i % 5 !== 0) {
            ctx.lineTo(8, i * 10 + 0.5);
        } else {
            ctx.lineTo(12, i * 10 + 0.5);
            ctx.fillText(i * 10, 17, i * 10 + 7)
        }

    }

    ctx.stroke();
}


//绘制顶部标尺方法

export const drawHorizontalRuler = (ctx)=>{
    ctx.lineWidth=0.1;
    //设置样式
    ctx.textBaseline = 'middle';
    ctx.beginPath()
    for(var i=0; i<193; i++){
      ctx.moveTo(i*10+0.5,1);
      if(i%5!==0){
          ctx.lineTo(i*10+0.5,8);
      }else{
          ctx.lineTo(i*10+0.5,12);
          ctx.fillText(i*10,i*10+5,17)
      }
      
    }

    ctx.stroke();
}