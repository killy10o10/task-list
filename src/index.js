import './styles/main.scss';

const addForm = document.querySelector('.add');
const listContainer = document.querySelector('.todos');

const generateTemplate = (todo) => {
  const listItem = `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${todo}</span> <i class="bi bi-trash delete"></i></li>`;

  listContainer.innerHTML += listItem;
};

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});