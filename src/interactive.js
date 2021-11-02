export function getFromStorage() {
  return localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];
}

export function saveToStorage(list) {
  localStorage.setItem('Tasks', JSON.stringify(list));
}

export function completed(element, list) {
  element = document.querySelector('.checkbox');
  element.addEventListener('change', () => {
    const task = element.nextElementSibling.innerHTML;
    if (element.checked === true) {
      list.forEach((item) => {
        if (item.todoText === task) {
          item.completed = true;
        }
      });
      element.nextElementSibling.classList.add('linethrough');
    } else {
      list.forEach((item) => {
        if (item.todoText === task) {
          item.completed = false;
        }
        element.nextElementSibling.classList.remove('linethrough');
      });
    }
    saveToStorage(list);
  });

  // const item = document.querySelector('.checkbox');
  // if (item.checked) {
  //   item.nextElementSibling.classList.add('linethrough');
  // } else {
  //   item.nextElementSibling.classList.remove('linethrough');
  // }
}

export default { completed, getFromStorage, saveToStorage };
