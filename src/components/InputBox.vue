<template>
    <div id='input_box'>
        <input type='text' :class='getFocus?"focus":""' @focus='getFocus=true' @blur='getFocus=false' v-model='content' @keyup.enter='add'>
    </div>
</template>

<script>
export default {
    name: "InputBox",
    props:{
        addTodo:Function
    },
    data(){
        return{
            content:'',
            getFocus:false
        }
    },
    methods:{
        add(){
            if(!this.content){
                alert("不允许提交空的TODO")
                return
            }
            let obj={
                content:this.content,
                finished:false
            }
            this.addTodo(obj)
            this.content=''
            this.$emit("addTodo")
        }
    }
}
</script>

<style scoped>
input {
    width: 440px;
    height: 30px;
    border:1px solid #e0e0e0;
    border-radius: 5px;
    outline: none;
    box-sizing:border-box;
}
.focus{
    box-shadow: 0 0 5px red;
}
</style>