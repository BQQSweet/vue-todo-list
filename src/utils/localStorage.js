export default {
  readTodos() {
    let arr=JSON.parse(localStorage.getItem("todoList"))||[]
    return arr
  },
  saveTodos(todo) {
    localStorage.setItem("todoList", JSON.stringify(todo))
  }
}
