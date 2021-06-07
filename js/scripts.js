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
    if(event.target.id == "delete"){
        const todo = event.target.parentElement.parentElement;
        console.log(todo);
        const id = todo.getAttribute("data-id");
        deleteTodo(id);
        todo.remove();
    }
})