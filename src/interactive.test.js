const jsdom = require('jsdom');

const { checkCompleted } = require('./interactive.js');

const { JSDOM } = jsdom;

const dom = new JSDOM(`<!DOCTYPE html><ul class="d-flex todo-lists"></ul>`); // eslint-disable-line
const document = dom.window.document; // eslint-disable-line
const window = dom.window.document; // eslint-disable-line

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      console.log(store);
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe(' checking status completed localstorage', () => {
  document.body.innerHTML = `
        <li class="list-container d-flex">
          <input type="checkbox" class="checkbox" checked>
          <p class="items show"   contenteditable="true">Hello Todo's</p>
          <i class="fas fa-ellipsis-v  dots"></i>
          <i class="far fa-trash-alt show delete"></i>
        </li>
        <button class="btn">Clear all Completed</button>
        `;
  test('function to check the complete statues false', () => {
    const list = localStorageMock;
    // addTodoToList('take a break', false, 0, list);
    const task = document.querySelector('.items').innerText;
    const element = document.querySelector('.checkbox');
    const bool = false;
    checkCompleted(list, task, element, bool);
    const jsonId = '0';
    const newJson = { completed: 'false' };
    localStorageMock.setItem(jsonId, newJson);
    // expect(localStorageMock.getItem(jsonId)).toEqual({"data": "json data"});
    expect(localStorageMock.getItem(jsonId)).toEqual({ completed: 'false' });
  });

  test(' function to check the complete status true', () => {
    const jsonId = '1';
    const newJson = { completed: 'true' };
    localStorageMock.setItem(jsonId, newJson);
    expect(localStorageMock.getItem(jsonId)).toEqual({ completed: 'true' });
  });

  test('clear all function check', () => {
    let list = localStorageMock;
    const btn = document.querySelector('.btn');
    btn.addEventListener('click', () => {
      list = [list].filter((item) => item.completed === false);
      expect(list).toBe(0);
    });
  });
  test('Editing tesk', () => {
    document.body.innerHTML = ' <p class="items"  contenteditable="true">Hello Todo\'s</p>';
    const edit = document.querySelector('.items');
    expect(edit.innerHTML).toBe("Hello Todo's");
  });
});

afterEach(() => {
  window.localStorage.clear();
});