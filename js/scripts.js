const btnAdd = document.querySelector('.icon-add');
const input = document.querySelector('.form-add__input');
const form = document.getElementById('form-add');
const todos = (localStorage.getItem('list') !== null)?  JSON.parse(localStorage.getItem("list")) : [];
const fragment = document.createDocumentFragment();
const template = document.getElementById('template-tarea').content;
const tareas = document.querySelector('.tareas');

const deleteTodo = (id) =>{
    for(const todo of todos){
        if(todo.id == id) todos.splice(todos[todo],1)
    }
    localStorage.setItem("list",JSON.stringify(todos))
}


const addTodo = (text,) =>{
    const randomNumber = Math.random() * (100 - 1) + 1;
    todos.push({
        text:text,
        id:randomNumber,
        checked:false
    });
    localStorage.setItem("list",JSON.stringify(todos));
    pintarTodo(text,randomNumber);
}

const pintarAllTodo = () =>{
    todos.forEach(todo=>{
        const todoChecked = todo.checked;
        if(todoChecked){
            template.querySelector('.checkbox').setAttribute("checked",true);
            template.querySelector('.tareas__text').classList.add("line-throught");
        };
        template.querySelector(".tareas__item").setAttribute("data-id",todo.id);
        template.querySelector(".text").textContent = todo.text;
        const cloneTemplate = document.importNode(template,true);
        fragment.appendChild(cloneTemplate);
    })
    tareas.append(fragment);
}

const pintarTodo = (text,id) =>{
    template.querySelector(".tareas__item").setAttribute("data-id",id)
    template.querySelector(".text").textContent = text;
    const cloneTemplate =  document.importNode(template,true);
    tareas.append(cloneTemplate);
}

const cambiarAchecked = (id,estado) =>{
    for(const todo of todos){
        if(todo.id == id) {
            if(estado) todo.checked = true
            else todo.checked = false;
        };
    }
    localStorage.setItem("list",JSON.stringify(todos));
}

if(todos.length > 0){
    pintarAllTodo();
}

btnAdd.addEventListener("click",()=>{
    const textTodo = input.value;
    if(textTodo !== "")addTodo(textTodo);
    form.reset();
})

form.addEventListener("submit",(event)=>{
    event.preventDefault();
})

tareas.addEventListener('click',(event)=>{
    const todo = event.target.parentElement.parentElement;
    const id = todo.getAttribute("data-id");
    if(event.target.id == "delete"){
        deleteTodo(id);
        todo.remove();
    }

    if(event.target.id == "Complete"){
        const checkedElement = event.target;
        const checked = checkedElement.getAttribute("checked")
        const containerText = checkedElement.parentElement.parentElement.children[1]
        if(checked){
            checkedElement.removeAttribute("checked");
            containerText.classList.remove('line-throught');
            cambiarAchecked(id,false);
        }else{
            checkedElement.setAttribute("checked",true);
            containerText.classList.add('line-throught');
            cambiarAchecked(id,true)
        }
    }
})