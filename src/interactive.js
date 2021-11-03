export function getFromStorage() {
  return localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];
}

export function saveToStorage(list) {
  localStorage.setItem('Tasks', JSON.stringify(list));
  return list;
}

export function completed(element, list) {
  element.addEventListener('change', () => {
    const task = element.nextElementSibling.innerHTML;
    if (element.checked === true) {
      list.forEach((item) => {
        if (item.description === task) {
          item.completed = true;
        }
      });
      element.nextElementSibling.classList.add('linethrough');
    } else {
      list.forEach((item) => {
        if (item.description === task) {
          item.completed = false;
        }
        element.nextElementSibling.classList.remove('linethrough');
      });
    }
    saveToStorage(list);
  });
}

export default { completed, getFromStorage, saveToStorage };
