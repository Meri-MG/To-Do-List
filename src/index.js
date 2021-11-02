import './style.css';

const listContainer = document.querySelector('.todo-lists');
const todoLists = [
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

function addTodo() {
  todoLists.forEach((list) => {
    listContainer.innerHTML += `<li class="d-flex list-container">
  <input type="checkbox" class="checkbox" checked>
  <p class="items checked">${list.description}</p>
  <i class="fas fa-ellipsis-v dots"></i>
  </li>`;
  });
}

// function displayTodo() {
//   a
// }

addTodo();
listContainer.addEventListener('click', () => {
  console.log();
})
