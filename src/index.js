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
// add todo lists to the object

function addTodo() {
  clearElement(listContainer);
  todoLists.forEach((list) => {
    listContainer.innerHTML += `<li class="list-container d-flex">
    <input type="checkbox" class="checkbox">
    <p class="items" contenteditable="true">${list.description}</p>
    <i class="fas fa-ellipsis-v dots"></i>
    <i class="far fa-trash-alt delete"></i>
    </li>`;
  });
}

// UI of the project

function displayTodo() {
  checkOrder();
  addTodo();
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

listContainer.addEventListener('dblclick', (e) => {
  const text = document.querySelector('.items').textContent;
  if (e.target.classList.contains('list-container')) {
    deleteTodoList(e.target);
  }
  if (e.target.classList.contains('delete')) {
    todoLists = todoLists.filter((item) => item.description !== text);
    saveToStorage(todoLists);
    window.location.reload();
  }
  text.addEventListener('blur', () => {
    todoLists.filter((item) => item.description !== text);
    saveToStorage(todoLists);
    window.location.reload();
  });
});

// delete all completed

clearCompleted.addEventListener('click', () => {
  todoLists = todoLists.filter((item) => item.completed === false);
  saveToStorage(todoLists);
  window.location.reload();
});
