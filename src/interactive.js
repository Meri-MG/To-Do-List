// const linethrough = 'linethrough';
// const checked = 'fa-check-square';
// const unchecked = 'fa-square';

export const completed = (element, array) => {
  element = document.querySelector('.checkbox');
  array.forEach((item) => {
    if (element.checked) {
      element.nextElementSibling.classList.add('linethrough');
    } else {
      element.nextElementSibling.classList.remove('linethrough');
    }
  })
  
};

export default { completed };