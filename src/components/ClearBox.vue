<template>
    <div id='clear_box'>
        <slot name='checkbox'></slot>
        <!--<div><input type='checkbox' :disabled='disable' v-model='isAllChecked'>已完成{{finishedCount}}件/总计{{todos.length}}件</div>-->
        <slot name='delete'></slot>
        <!--<button :disabled='disable' :class='{disable:disable}' @click='delFinishied'>清除已完成任务</button>-->
    </div>
</template>

<script>
export default {
    name: "ClearBox",
    props: {
        todos:Array,
        delFinishiedTodo:Function,
        disable:Boolean
    },
    data() {
        return {
        }
    },
    methods:{
        delFinishied(){
            this.delFinishiedTodo()
        }
    },
    computed: {
        finishedCount(){
            return this.todos.reduce((total,current)=>{
                return total+(current.finished?1:0)
            },0)
        },
        isAllChecked: {
            get() {
                return this.finishedCount == this.todos.length&&this.todos.length>0
            },
            set(e) {
                this.todos.map(v=>v.finished=e)
            }
        }

    }
}
</script>

<style scoped>
#clear_box {
    width: 440px;
    display: flex;
    justify-content: space-between;
}
.disable{
    background-color: #eeeeee;
}
</style>