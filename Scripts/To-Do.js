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
});


function renderHTML () {
  toDoHTML.innerHTML = '';

  toDoArray.forEach((toDoTask) => {
    idNoOfInput += 1;
    const toDoElement = document.createElement('li');
    toDoElement.className = 'to-do-list-container py-1';
    toDoElement
      .innerHTML += 
      `
      <input type="checkbox" id="input-${idNoOfInput}" class="generated-btns-props js-todo-done todo-done-btn">

      <label class="js-todo-name for="input-${idNoOfInput}">

        <span class="todo-name" style="opacity: ${toDoTask.opacity}; text-decoration: ${toDoTask.textDecoration};">
          ${toDoTask.inputValue}
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

    const assinInput = document.getElementById(`input-${idNoOfInput}`);

    const labelBefore = assinInput.nextElementSibling;

    labelBefore.style.setProperty('--before-content', toDoTask.beforeContent);
    labelBefore.style.setProperty('--before-background-color',toDoTask.beforeBackColor);
    
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
    const toDoItem = event.target.parentElement;
    const toDoChild = event.target.getElementsByTagName('span')[0];

    const index = Array.from(toDoHTML.children).indexOf(toDoItem);

    if (toDoChild.style.opacity === '1') {
      toDoArray[index].opacity = '0.5';
      toDoArray[index].textDecoration = 'line-through';
      toDoArray[index].beforeContent = 
      `url(Icons/Star-icon.png)`
      ;
      toDoArray[index].beforeBackColor = 
      `#ffd60a`
      ;
    } else {
      toDoArray[index].opacity = '1';
      toDoArray[index].textDecoration = 'none';
      toDoArray[index].beforeContent = 
        `''`
      ;
      toDoArray[index].beforeBackColor = 
        `#fff`
      ;
    }
    renderHTML();
    addToArray();
  };

  if (event.target.classList.contains('todo-name')) {
    const toDoItem = event.target;
    const index = Array.from(toDoHTML.children).indexOf(toDoItem.parentElement.parentElement);

    if (toDoItem.style.opacity === '1') {
      toDoArray[index].opacity = '0.5';
      toDoArray[index].textDecoration = 'line-through';
      toDoArray[index].beforeContent = 
      `url(Icons/Star-icon.png)`
      ;
      toDoArray[index].beforeBackColor = 
      `#ffd60a`
      ;
    } else {
      toDoArray[index].opacity = '1';
      toDoArray[index].textDecoration = 'none';
      toDoArray[index].beforeContent = 
        `''`
      ;
      toDoArray[index].beforeBackColor = 
        `#fff`
      ;
    }
    renderHTML();
    addToArray();
  }
});



function addToArray () {
  localStorage.setItem('toDoTasks', JSON.stringify(toDoArray));
};


function addToDo () {
  const inputValue = inputField.value.trim();

  if (inputValue !== '') {

    toDoArray.push({
      inputValue,
      opacity: '1', 
      textDecoration:'none',
      beforeContent: '""',
      beforeBackColor: '#fff'
    });

    inputField.value = ''; 

    renderHTML();
  }

  addToArray();
};

function removeToDo (index) {
  toDoArray.splice(index, 1);
  addToArray();
};
