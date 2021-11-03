export function addTodoToList(description, completed = false, id, list) {
  const todo = { description, completed, id };
  list.push(todo);
}

export function deleteTodoList(element) {
  element.children[2].classList.add('none');
  element.children[3].classList.add('show');
  element.classList.add('show');
}

export default { deleteTodoList, addTodoToList };
