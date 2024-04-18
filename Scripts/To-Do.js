let toDoArray = JSON.parse(localStorage.getItem('toDoTasks')) || [];


const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');

renderHTML();

toDoBtn.addEventListener('click', () => {
  inputField.focus();
  toDoBtn.innerHTML
});


addBtn.addEventListener('click', () => {
  addToDo();
});


function renderHTML () {
  toDoHTML.innerHTML = '';

  toDoArray.forEach((toDoName, index) => {
    const toDoElement = document.createElement('li');
    toDoElement.className = 'to-do-list-container'; 
    toDoElement
      .innerHTML += 
      `
        <span>          
          <input type="checkbox" class="generated-btns-props js-todo-done todo-done-btn">
        </span>

        <span>
          <span class="js-todo-name todo-name">
            ${toDoName}
          </span>
        </span>

        <span>
          <span class="material-symbols-outlined generated-btns-props js-todo-delete">
            close
          </span>
        </span>
      `
    ;

    toDoHTML.appendChild(toDoElement);
  });

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
    }

    const target = event.target;

    if (event.target.classList.contains('js-todo-done')) {
      const todoTextItem = event.target.parentElement.nextElementSibling;
      const radioInput = target;
      const isChecked = radioInput.checked;

      var checkbox = target; // The clicked checkbox element

      if (isChecked) {
        // Find the corresponding todo item index
        const radioInputs = toDoHTML.querySelectorAll('.js-todo-done');
        const todoElement = checkbox.parentElement.nextElementSibling;
        const index = Array.from(toDoArray).indexOf(todoElement);
        radioInputs.forEach((input, index) => {
          if (input === radioInput) {
            const todoItem = input.parentElement.parentElement; // Get the parent todo <li> element
          }
          if (event.target.checked) {
            checkbox.parentElement.nextElementSibling.classList.add('todo-completed');
            checkbox.parentElement.nextElementSibling.style.setProperty('--after-width', newWidth);
          } 
          // else {
            
          // }
        });   
      } else {
        checkbox.parentElement.nextElementSibling.classList.remove('todo-completed');
        checkbox.parentElement.nextElementSibling.style.setProperty('--after-width', initialWidth);
      }
    }
  });
}


inputField.addEventListener('focus', () => {
  inputField.style.color = 'white';
});

if (!inputField.value) {
  inputField.addEventListener('blur', () => {
    inputField.style.color = 'rgb(0, 180, 216)';
  })
}


function addToArray () {
  localStorage.setItem('toDoTasks', JSON.stringify(toDoArray));
}


function addToDo () {
  const inputValue = inputField.value.trim();

  if (inputValue !== '') {
    toDoArray.push(inputValue);
    inputField.value = ''; 
    renderHTML();
  }
  addToArray();
}

function toDoComplete (index) {
  toDoArray[index].classList.add('todo-completed');
}

function removeToDo (index) {
  toDoArray.splice(index, 1);
  btnClicked = true;
  addToArray();
}
