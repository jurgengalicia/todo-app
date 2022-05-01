
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

const form = document.querySelector(".formselect");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const input = document.querySelector(".inputselect");
    const text = input.value.trim();

    if(text !== ""){
        addTodo(text);
        input.value = "";
    }
});

const list = document.querySelector(".js-todo-list");
list.addEventListener("click", (event) => {
    if(event.target.classList.contains("js-tick")){
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }
    if (event.target.classList.contains("js-delete-todo")){
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }
});

document.addEventListener("DOMContentLoaded", ()=>{
    const ref = localStorage.getItem("demoarray");
    if(ref){
        demoarray = JSON.parse(ref);
        demoarray.forEach((t)=>{
            renderTodo(t);
        });
    }
});

const toggleSwitch = document.querySelector(
    '.theme-switch input[type="checkbox"]'
);

const currentTheme = localStorage.getItem("theme");

if(currentTheme){
    document.documentElement.setAttribute("data-theme", cuurrentTheme);

    if(currentTheme === "dark"){
        toggleSwitch.checked = true;
    }
}

function switchTheme(e){
    if(e.target.checked){
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
    }else{
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
    }
}

toggleSwitch.addEventListener("chage", switchTheme, false);
