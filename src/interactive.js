export function getFromStorage() {
  return localStorage.getItem('Tasks') ? JSON.parse(localStorage.getItem('Tasks')) : [];
}

export function saveToStorage(list) {
  localStorage.setItem('Tasks', JSON.stringify(list));
  return list;
}

function checkCompleted(list, task, element, bool) {
  list = [];
  list.forEach((item) => {
    if (item.description === task) {
      item.completed = bool; // local
    }
    if (bool) {
      element.nextElementSibling.classList.add('linethrough');
    } else {
      element.nextElementSibling.classList.remove('linethrough');
    }
  });
  return list;
}

export function completed(element, list) {
  element.addEventListener('change', () => {
    const task = element.nextElementSibling.innerHTML;
    if (element.checked === true) {
      checkCompleted(list, task, element, true);
    } else {
      checkCompleted(list, task, element, false);
    }
    saveToStorage(list);
  });
}

export default { completed, getFromStorage, saveToStorage };

module.exports = { checkCompleted };
