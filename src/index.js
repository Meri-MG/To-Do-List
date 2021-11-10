import './style.css';
import { completed, saveToStorage, getFromStorage } from './interactive.js';
import { addTodoToList, deleteTodoList } from './add_remove.js';

const listContainer = document.querySelector('.todo-lists');
const form = document.querySelector('.input-container');
const clearCompleted = document.querySelector('.btn');
let todoLists = [];

// check the order of the todo lists
function checkOrder() {
  todoLists.sort((a, b) => {
    const index1 = a.id;
    const index2 = b.id;

    if (index1 < index2) {
      return -1;
    }
    if (index1 > index2) {
      return 1;
    }
    return 0;
  });
}

// cleat previous elements in the container

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function changeTask(e) {
  const el = e.target;
  const index = el.dataset.id;
  const desc = el.innerText;

  todoLists.forEach((task) => {
    if (task.id == index) {
      task.description = desc;
    }
  });
  saveToStorage(todoLists);
}

function bindListenerTasks() {
  const items = document.querySelectorAll('.items');
  items.forEach((item) => {
    item.removeEventListener('blur', (e) => {
      changeTask(e);
    });
  });
  items.forEach((item) => {
    item.addEventListener('blur', (e) => {
      changeTask(e);
    });
  });
}

// add todo lists to the object

function addTodo() {
  clearElement(listContainer);
  todoLists.forEach((list) => {
    const taskCompleted = list.completed ? 'linethrough' : '';
    const checked = list.completed ? 'checked' : '';
    listContainer.innerHTML += `<li class="list-container d-flex">
    <input type="checkbox" class="checkbox" ${checked} >
    <p class="items ${taskCompleted}" data-id="${list.id}" contenteditable="true">${list.description}</p>
    <i class="fas fa-ellipsis-v dots"></i>
    <i class="far fa-trash-alt delete"></i>
    </li>`;
  });

  bindListenerTasks();
}

// UI of the project

function displayTodo() {
  checkOrder();
  addTodo();
  bindListenerTasks();
}

function reindex(todoLists) {
  todoLists.forEach((todo, i) => {
    todo.id = i;
  });
  saveToStorage(todoLists);
  displayTodo();
}

// load the page

window.addEventListener('DOMContentLoaded', () => {
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    todoLists = getFromStorage();
    displayTodo();
  }
  saveToStorage(todoLists);
});

// task completed

listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    completed(e.target, todoLists);
  }
});

// add the task

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoInput = document.getElementById('myInput').value;
  if (todoInput === '') {
    alert('Please, enter the To Do for the day');
  } else {
    addTodoToList(todoInput, false, todoLists.length, todoLists);
    addTodo();
    saveToStorage(todoLists);
    form.reset();
  }
});

// delete the task

listContainer.addEventListener('click', (e) => {
  const task = document.querySelector('.items').textContent;
  if (e.target.classList.contains('list-container')) {
    deleteTodoList(e.target); // ui;
  }
  if (e.target.classList.contains('delete')) {
    todoLists = todoLists.filter((item) => item.description !== task);
    reindex(todoLists);
    window.location.reload();
  }
});

// clear all completed

clearCompleted.addEventListener('click', () => {
  todoLists = todoLists.filter((item) => item.completed === false);
  reindex(todoLists);
  saveToStorage(todoLists);
  window.location.reload();
});
