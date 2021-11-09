import { addTodoToList } from './add_remove.js';

describe('Add to the List', () => {
  test('Should add task to the list', () => {
    expect(addTodoToList('take a break', false, 0, [])).toEqual([{ description: 'take a break', completed: false, id: 0 }]);
  });
});
