<template>
    <div id='app'>
        <div class='app'>
            <div id='header'>
                <input-box ref='add' :addTodo='addTodo'></input-box>
            </div>
            <div id='list'>
                <choose-box :todos='todos' :delTodo='delTodo'></choose-box>
            </div>
            <div id='footer'>
                <clear-box>
                    <div slot='checkbox'><input type='checkbox' :disabled='disable' v-model='isAllChecked'>已完成{{finishedCount}}件/总计{{todos.length}}件</div>
                    <button slot='delete' :disabled='disable' :class='{disable:disable}' @click='delFinishiedTodo'>清除已完成任务</button>
                </clear-box>
            </div>
        </div>
    </div>
</template>

<script>
import InputBox from "./components/InputBox"
import ChooseBox from "./components/ChooseBox"
import ClearBox from "./components/ClearBox"
import localStorage from '@/utils/localStorage'
import PubSub from "pubsub-js"

export default {
    name: 'App',
    components: {
        InputBox,
        ChooseBox,
        ClearBox
    },
    data() {
        return {
            todos: localStorage.readTodos(),
            disable: false,
            len: 0
        }
    },
    created() {

    },
    mounted() {
        this.$refs.add.$on("addTodo", function () {
            console.log("接收到数据");
        })
        //    订阅
        PubSub.subscribe('delTodo',(msg,token)=>{
            console.log(msg, token);
            this.delTodo(token)
        })
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

    },
    watch: {
        todos: {
            deep: true,//深度监视 适用于监视对象
            immediate: true, //是否立即执行
            handler: localStorage.saveTodos
        }
    },
    methods: {
        addTodo(todo) {
            this.todos.unshift(todo)
        },
        delTodo(index) {
            this.todos.splice(index, 1)
        },
        delFinishiedTodo() {
            let finishedArr = this.todos.filter(v => v.finished == true)
            this.todos = this.todos.filter(todo => todo.finished == false)
            if (finishedArr.length == 0) {
                alert("没有已完成的任务！！")
            }
        }
    },

}
</script>

<style>
#app {
    display: flex;
    justify-content: center;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.app {
    width: 450px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

#list {
    margin-top: 10px;
}

#footer {
    margin-top: 20px;
}

button {
    background-color: #FFA500;
    border: none;
    height: 30px;
    color: #ffffff;
    border-radius: 5px;
    outline: none;
}

button:hover {
    background-color: #fa1010;
}
</style>
