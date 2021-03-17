<template>
       <li :style='{backgroundColor:bgColor}' @mouseenter='liShow(true)' @mouseleave='liShow(false)'>
           <input type='checkbox' v-model='todo.finished'>{{todo.content}}
           <button v-show='isShowDelBtn' @click='delItem'>删除</button>
       </li>
</template>

<script>
export default {
    name: "ChooseItem",
    props:{
        todo:Object,
        delTodo:Function,
        index:{
            type:Number
        }
    },
    data(){
        return{
            isShowDelBtn:false,
            bgColor:"#fff"
        }
    },
    methods:{
        liShow(type){
            this.isShowDelBtn=type
            this.bgColor=type?"#eeeeee":"#fff"
        },
        delItem(){
            if(window.confirm("确认删除吗?")){
                this.delTodo(this.index)
            }
        }
    }
}
</script>

<style scoped>
li {
    width: 100%;
    height: 30px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    outline: none;
    display: flex;
    align-items: center;
    padding-left: 10px;
    box-sizing: border-box;
}
button{
    margin-left: auto;
    margin-right: 10px;
    height: 24px;
}
</style>