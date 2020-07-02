//selectors
const todoInput = document.querySelector('.todo-input');
const todoButtont = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
todoButtont.addEventListener('DOMContentLoader', getTodos);
todoButtont.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);


//functions
function addTodo(event){ 
  event.preventDefault();   //prevent from form submition

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  //create li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //saving toDos to local storage
  saveLocalTodos(todoInput.value);

  //check button
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add('complete-btn');
  todoDiv.appendChild(completedButton);
  
  //delete button
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
  deleteButton.classList.add('trash-btn');
  todoDiv.appendChild(deleteButton);

  //append to form list
  todoList.appendChild(todoDiv);

  //clear todo Input value
  todoInput.value = "";
}


function deleteCheck(event){
  const item = event.target;

  //Delete ToDo
  if(item.classList[0] === "trash-btn"){
    const todo = item.parentElement;
    //animation
    removeLocalTodos(todo);
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
      todo.remove(); 
    });
  }

  if(item.classList[0] === "complete-btn"){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}


function filterTodo(event) {
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch(event.target.value){
      case "all": 
          todo.style.display = "flex";
        break;
      case "completed": 
          if(todo.classList.contains('completed')){
            todo.style.display = 'flex';
          }
          else {
            todo.style.display = 'none';
          }
        break;
      case "uncompleted":
          if(!todo.classList.contains('completed')){
            todo.style.display = 'flex';
          }
          else {
            todo.style.display = 'none';
          }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodos(){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function(todo){
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    //create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //check buttons
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    
    //delete buttons
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('trash-btn');
    todoDiv.appendChild(deleteButton);

    //append to form list
    todoList.appendChild(todoDiv);
  });
}


function removeLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerHTML;
  todos.splice(todos.indeOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}