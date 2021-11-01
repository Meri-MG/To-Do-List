import './style.css';

const listContainer = document.querySelector('.todo-lists');
const objectArray = [
  {
    description: 'Do Yoga',
    completed: false,
    id: 1,
  },
  {
    description: 'Submit Project',
    completed: false,
    id: 2,
  },
];

function addTodo(array) {
  listContainer.innerHTML += `<li class="d-flex list-container">
  <input type="checkbox" class="checkbox" id="${array.id}" checked>
  <p class="items checked">${array.description}</p>
  <i class="fas fa-ellipsis-v dots"></i>
  </li>`;
}

function displayTodo() {
  a
}

addTodo();