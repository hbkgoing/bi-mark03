<template>
  <canvas ref="$canvas">
  </canvas>

</template>

<script>
import { drawHorizontalRuler , drawVerticalRuler } from './utils';


export default {

    props:{
        vertical: Boolean,
        width: Number,
        height: Number,
    },

    methods:{
        initCanvasRef() {
            //获取canvas，得到context
            this.$canvas = this.$refs.$canvas;
            this.canvasContext = this.$canvas && this.$canvas.getContext('2d')
            this.$canvas.width=this.width;
            this.$canvas.height=this.height;
            // this.$canvas.style={top:'20px'}
        },
        drawRuler() {
            // const options = { 
            //     scale: this.scale, 
            //     width: this.width, 
            //     height: this.height, 
            //     canvasConfigs: this.canvasConfigs
            // }
            
            if (this.vertical) {
                drawVerticalRuler(
                    this.canvasContext
                )
            } else {
                drawHorizontalRuler(
                    this.canvasContext
                )
            }
        },
    },

    mounted(){
        this.initCanvasRef();
        this.drawRuler()
    }



}
</script>

<style>
canvas{
    position: absolute;
}
</style>