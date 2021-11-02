import './style.css';

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

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function addTodo() {
  clearElement(listContainer);
  todoLists.forEach((list) => {
    listContainer.innerHTML += `<li class="d-flex list-container">
  <input type="checkbox" class="checkbox">
  <p class="items" id="${list.id}">${list.description}</p>
  <i class="fas fa-ellipsis-v dots"></i>
  </li>`;
  });
}

function displayTodo() {
  checkOrder();
  addTodo();
}

displayTodo();
