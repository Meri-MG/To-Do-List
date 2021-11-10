import { addTodoToList } from './add_remove.js';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><ul class="d-flex todo-lists"></ul>`); // eslint-disable-line
const document = dom.window.document; // eslint-disable-line

describe('Add to the List Function', () => {
  const list = [];
  addTodoToList('take a break', false, 0, list);
  addTodoToList('Drink water', false, 1, list);
  addTodoToList('Walk the Dog', false, 2, list);
  addTodoToList('Submit the project', false, 3, list);
  test('Should give the length of the array', () => {
    expect(list).toHaveLength(4);
  });
  test('Should have property description', () => {
    expect(list[1]).toHaveProperty('description', 'Drink water');
  });
  test('Should check if completed has a falsy value', () => {
    expect(list[2].completed).toBeFalsy();
  });
  test('Should check if object contains certain value', () => {
    expect(list[3].description).toContain('Submit the project');
  });
  test('Should check if id is 3', () => {
    expect(list[3].id).toBe(3);
  });
});
test('remove form the dom', () => {
  document.body.innerHTML = `
    <li class="list-container d-flex">
      <input type="checkbox" class="checkbox">
      <p class="items show"   contenteditable="true">Hello Todo's</p>
      <i class="fas fa-ellipsis-v  dots"></i>
      <i class="far fa-trash-alt show delete"></i>
    </li>
    `;
  const element = document.querySelector('.list-container');
  expect(element.children[2].classList.contains('show')).toBe(false);
  expect(element.children[3].classList.contains('show')).toBeTruthy();
});
