import './styles/main.scss';

const addForm = document.querySelector('.add');
const listContainer = document.querySelector('.todos');
const search = document.querySelector('.search input');

// Generate Todos Dynamically
const generateTemplate = (todo) => {
  const listItem = `<li class="list-group-item d-flex justify-content-between align-items-center"><span>${todo}</span> <i class="bi bi-trash delete"></i></li>`;

  listContainer.innerHTML += listItem;
};

// Add Todos to UI
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim();
  if (todo.length) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// Delete Todos
listContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove();
  }
});

// converting list items to array and matching them
const filterTodos = (keyWord) => {
  Array.from(listContainer.children)
    .filter((task) => !task.textContent.toLowerCase().includes(keyWord))
    .forEach((task) => task.classList.add('filtered'));

  Array.from(listContainer.children)
    .filter((task) => task.textContent.toLowerCase().includes(keyWord))
    .forEach((task) => task.classList.remove('filtered'));
};
// Keyup Event for searching
search.addEventListener('keyup', () => {
  const keyWord = search.value.trim().toLowerCase();
  filterTodos(keyWord);
});