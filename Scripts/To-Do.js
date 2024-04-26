let toDoArray = JSON.parse(localStorage.getItem('toDoTasks')) || [];


const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');
const inputArea = document.getElementById('js-input-area');

let idNoOfInput = 0;

renderHTML();

toDoBtn.addEventListener('click', () => {
  inputField.focus();
  toDoBtn.innerText = 'circle';
});

addBtn.addEventListener('click', () => {
  addToDo();
  toDoBtn.innerText = 'add_task';
});

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addToDo();
    toDoBtn.innerText = 'add_task';
  }
});

inputField.addEventListener('focus', () => {
  inputField.style.color = '#b8f500';
  toDoBtn.innerText = 'circle';
  inputArea.style.borderColor = '#b8f500';
});

inputField.addEventListener('blur', () => {
  if (!inputField.value) {
    inputField.style.color = '#fff';
    toDoBtn.innerText = 'add_task';
    inputArea.style.borderColor = '#fff';
  }
})



function renderHTML () {
  toDoHTML.innerHTML = '';

  toDoArray.forEach((toDoName) => {
    idNoOfInput += 1;
    const toDoElement = document.createElement('li');
    toDoElement.className = 'to-do-list-container py-1';
    toDoElement
      .innerHTML += 
      `
      <input type="checkbox" id="input-${idNoOfInput}" class="generated-btns-props js-todo-done todo-done-btn">
      <label class="js-todo-name" for="input-${idNoOfInput}" class="material-symbols-outlined">
        <span class="todo-name">
          ${toDoName}
        </span>
      </label>
      <span class="delete-btn-cont">
        <span class="material-symbols-outlined generated-btns-props js-todo-delete">
          close
        </span>
      </span> 
      `
    ;

    toDoHTML.appendChild(toDoElement);
    addToArray();
  });
}


toDoHTML.addEventListener('click', (event) => {

  if (event.target.classList.contains('js-todo-delete')) {
    const todoItem = event.target.parentElement.parentElement;
    const index = Array.from(toDoHTML.children).indexOf(todoItem);
    if (index !== -1) {
      removeToDo(index);
      renderHTML();
    } 
  };

  if (event.target.classList.contains('js-todo-name')) {
    const toDoItem = event.target.getElementsByTagName('span')[0];
    toDoItem.classList.toggle('to-do-completed');
  }

  if (event.target.classList.contains('todo-name')) {
    const toDoItem = event.target;
    toDoItem.classList.toggle('to-do-completed');
  }
});



function addToArray () {
  localStorage.setItem('toDoTasks', JSON.stringify(toDoArray));
};


function addToDo () {
  const inputValue = inputField.value.trim();

  if (inputValue !== '') {
    toDoArray.push(inputValue);
    inputField.value = ''; 
    renderHTML();
  }
  addToArray();
};

function toDoComplete (index) {
  toDoArray[index].classList.add('todo-completed');
};

function removeToDo (index) {
  toDoArray.splice(index, 1);
  btnClicked = true;
  addToArray();
};
