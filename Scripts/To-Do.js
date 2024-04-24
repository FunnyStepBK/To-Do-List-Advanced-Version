let toDoArray = JSON.parse(localStorage.getItem('toDoTasks')) || [];


const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');

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
});

if (!inputField.value) {
  inputField.addEventListener('blur', () => {
    inputField.style.color = '#fff';
    toDoBtn.innerText = 'add_task';
  })
};


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
      <label class="js-todo-name" for="input-${idNoOfInput}">
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
  });
}

const newWidth = '100%';
const initialWidth = '0%';

toDoHTML.addEventListener('click', (event) => {
  if (event.target.classList.contains('js-todo-delete')) {
    const todoItem = event.target.parentElement.parentElement;
    const index = Array.from(toDoHTML.children).indexOf(todoItem);
    if (index !== -1) {
      removeToDo(index);
      renderHTML();
    } 
  };

  const target = event.target;

  // if (event.target.classList.contains('js-todo-done')) {
  //   const radioInput = target;
  //   const isChecked = radioInput.checked;

  //   var checkbox = target; // The clicked checkbox element

  //   if (isChecked) {
  //     // Find the corresponding todo item index
  //     const radioInputs = toDoHTML.querySelectorAll('.js-todo-done');
  //     radioInputs.forEach(() => {
  //       if (event.target.checked) {
  //         // checkbox.parentElement.nextElementSibling.classList.add('todo-completed');
  //         // checkbox.parentElement.nextElementSibling.style.setProperty('--after-width', newWidth);
  //       } 
  //       // else {
          
  //       // }
  //     });   
  //   } else {
  //     // checkbox.parentElement.nextElementSibling.classList.remove('todo-completed');
  //     // checkbox.parentElement.nextElementSibling.style.setProperty('--after-width', initialWidth);
  //   }
  // }
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
