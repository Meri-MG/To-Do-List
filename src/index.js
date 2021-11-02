import './style.css';
import { completed, saveToStorage } from './interactive.js';

const listContainer = document.querySelector('.todo-lists');
const todoLists = [
  {
    description: 'Do Yoga',
    completed: false,
    id: 1,
  },
  {
    description: 'Submit the Project',
    completed: false,
    id: 3,
  },
  {
    description: 'Walk the dog',
    completed: false,
    id: 2,
  },
];

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
    listContainer.innerHTML += `<li class="d-flex list-container">
    <input type="checkbox" class="checkbox" id="${list.id}">
    <p class="items" id="${list.id}">${list.description}</p>
    <i class="fas fa-ellipsis-v dots"></i>
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
    displayTodo(todoLists);
  }
  saveToStorage(todoLists);
});

// task completed

listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('checkbox')) {
    completed(e.target, todoLists);
  }
});
