<template>
    <div id='choose_box'>
        <ul>
            <ChooseItem :delTodo="delTodo" :todo='item' :index='index' v-for='(item,index) in todos' :key='index'></ChooseItem>
        </ul>
    </div>
</template>

<script>
import ChooseItem from './ChooseItem'
export default {
    name: "ChooseBox",
    components:{
        ChooseItem
    },
    props: {
        todos: Array,
        delTodo:Function
    },
    methods:{
        liShow(type){
            this.isShowDelBtn=type
        }
    }
}
</script>

<style scoped>
ul{
    padding: 0;
    margin: 0;
}
li:not(:last-child){
    border-bottom: none;
}
#choose_box{
    width: 440px;
}
</style>