import { defineStore } from 'pinia'

export const useUndoStore= defineStore('undoList',{
    state:()=>{
        return {
            value:[[]]
        }
    },
    actions:{
        spliceLatest(){
            let latestd = this.value.length-1;
            this.value.splice(latestd,1)
        }
    }
})