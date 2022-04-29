
let demoarray = [];


//render todo items
function renderTodo(todo) {
    localStorage.setItem('demoarray', JSON.stringify(demoarray));

    const list = document.querySelector(".todo-list");
    const item = document.querySelector(`[data-key='${todo.id}']`);

    if(todo.deleted){
        item.remove();
        return;
    }

    const isChecked = todo.checked ? "done" : "";

    const newList = document.createElement("li");

    newList.setAttribute("class", `todo-item ${isChecked}`);
    newList.setAttribute("data-key", todo.id);

    newList.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for "${todo.id}" class="tick js-tick"></label>
    <span>${todo.x}</span>
    <button class="delete-todo js-delete-todo">
        <button class="delete=todo js-delete-todo">
            <svg fill="var(--svgcolor)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
            </svg>
        </button>
    `;

    if(item){
        list.replaceChild(newList, item);
    } else {
        list.append(newList);
    }
}

function addTodo(x){
    const todoobject = {
        x,
        checked:false,
        id: Date.now(),
    };
    demoarray.push(todoobject);

    renderTodo(todoobject);
    console.log(demoarray);
}

function toggleDone(b) {
    const index = demoarray.findIndex((myItem) => myItem.id === Number(b));
    demoarray[index].checked = !demoarray[index].checked;
    renderTodo(demoarray[index]);
}

function deleteTodo(c){
    const index = demoarray.findIndex((myItem) => myItem.id === Number(c));
    const emptytodo = {
        deleted:true,
        ...demoarray[index],
    };
    demoarray = demoarray.filter((myItem) => myItem.id !== Number(c))
    renderTodo(emptytodo);
}
