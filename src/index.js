import './styles/main.scss';

const addForm = document.querySelector('.add');
const listContainer = document.querySelector('.todos');
const search = document.querySelector('.search input');
const list = JSON.parse(localStorage.getItem('todo')) || []; // Retrieve tasks from Local Storage

class Todo {
  constructor(description) {
    this.index = list.length + 1;
    this.description = description;
    this.completed = false;
  }
}

// Local Storage
// Function to add tasks to Local Storage
function addToDoToLocalStorage(todo) {
  list.push(todo);
  localStorage.setItem('todo', JSON.stringify(list));
}

// Function to delete a task from Local storage
function removeTask(id) {
  list.forEach((listItem, index) => {
    if (id === listItem.index) {
      list.splice(index, 1);
    }
  });
  // list.forEach((listItem, index) => {
  //   listItem.index = index + 1;
  // });
  localStorage.setItem('todo', JSON.stringify(list));
}
// Generate Todos Dynamically
const generateTemplate = (todo) => {
  const listItem = `
  <li class="list-group-item d-flex justify-content-between align-items-center">${todo.description}<i class="bi bi-trash delete"></i> <span hidden>${todo.index}</span></li>`;
  listContainer.innerHTML += listItem;
};

// Add Todos to UI
addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const todoInput = addForm.add.value.trim();
  if (todoInput.length) {
    const newTodo = new Todo(todoInput);
    generateTemplate(newTodo);
    addToDoToLocalStorage(newTodo); // Set local Storage
    addForm.reset();
  }
});

// Function to show Tasks in UI From Localstorage
function displayTasks() {
  list.forEach((listItem) => {
    generateTemplate(listItem);
  });
}

// Event: Display Tasks
document.addEventListener('DOMContentLoaded', displayTasks);

// Delete Todos
listContainer.addEventListener('click', (e) => {
  const currentList = e.target.closest('.list-group-item');
  const index = currentList.querySelector('span').textContent;
  if (e.target.classList.contains('delete')) {
    e.target.parentElement.remove(); // we can also remove it like this => currentList.remove();
    removeTask(Number(index));
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