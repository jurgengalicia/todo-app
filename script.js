
let demoarray = [];

function renderTodo(todo) {
    localStorage.setItem('demoarray', JSON.stringify(demoarray));

    const list = document.querySelector(".todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    
}
