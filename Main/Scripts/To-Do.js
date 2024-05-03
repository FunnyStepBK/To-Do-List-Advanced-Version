const loader = document.querySelector('.loader');

window.addEventListener('load', () => {
  loader.classList.add('loader--hidden');
});


setTimeout( () => {
  document.body.removeChild(loader);
}, 2000);


let toDoArray = JSON.parse(localStorage.getItem('toDoTasks')) || [];


const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');
const inputArea = document.getElementById('js-input-area');

let idNoOfInput = 0;

let editedToDo = false;

let editedToDoIndex;

renderHTML();

toDoBtn.addEventListener('click', () => {
  inputField.focus();
  toDoBtn.innerText = 'circle';
});

addBtn.addEventListener('click', () => {
  addToDo(editedToDoIndex);
  toDoBtn.innerText = 'add_task';
  inputArea.style.borderColor = '#fff';
  inputField.style.color = '#fff';
});

inputField.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addToDo(editedToDoIndex);
    toDoBtn.innerText = 'circle';
  }
});

inputField.addEventListener('focus', () => {
  inputField.style.color = '#ffd60a';
  toDoBtn.innerText = 'circle';
  inputArea.style.borderColor = '#ffd60a';
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

    const assignedInput = document.getElementById(`input-${idNoOfInput}`);

    const labelBefore = assignedInput.nextElementSibling;

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

    inputField.value = toDoArray[index].inputValue;
    inputField.focus();
    removeToDo(index);
    editedToDo = true;
    editedToDoIndex = index;
    
    renderHTML();
    addToArray();
  }
});



function addToArray () {
  localStorage.setItem('toDoTasks', JSON.stringify(toDoArray));
};


function addToDo (editedToDoIndex) {
  const inputValue = inputField.value.trim();

  if (!editedToDo) {
    if (inputValue !== '') {

      toDoArray.push({
        inputValue,
        opacity: '1', 
        textDecoration:'none',
        beforeContent: '""',
        beforeBackColor: '#fff'
      });

      editedToDo = false;
  
      inputField.value = ''; 
  
      renderHTML();
    }
  } else if (editedToDo) {
    if (inputValue !== '') {

      toDoArray.splice(editedToDoIndex, 0, {
        inputValue,
        opacity: '1', 
        textDecoration:'none',
        beforeContent: '""',
        beforeBackColor: '#fff'
      });

      editedToDo = false;
  
      inputField.value = ''; 
  
      renderHTML();
    }
  }

  

  addToArray();
};

function removeToDo (index) {
  toDoArray.splice(index, 1);
  addToArray();
};
