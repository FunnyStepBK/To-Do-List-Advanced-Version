const toDoArray = [];

const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');


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
          <input type="radio" class="generated-btns-props js-todo-done todo-done-btn">
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

      if (isChecked) {
        // Find the corresponding todo item index
        const radioInputs = toDoHTML.querySelectorAll('.js-todo-done');
        const checkbox = target; // The clicked checkbox element
        const todoElement = checkbox.closest('li');
        radioInputs.forEach((input, index) => {
          if (input === radioInput) {
            const todoItem = input.parentElement.parentElement; // Get the parent todo <li> element
            newWidth = '100%';
            todoTextItem.style.setProperty('--after-width', newWidth)
            const index2 = Array.from(toDoArray).indexOf(todoElement);
            if (todoElement) {
              console.log(index2);
            }
            setTimeout(() => {
              todoItem.classList.add('todo-completed');

              setTimeout(() => {
                todoItem.remove();
              }, 1000)
              
            }, 2000)
          }
        });     
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



function addToDo () {
  const inputValue = inputField.value.trim();

  if (inputValue !== '') {
    toDoArray.push(inputValue);
    inputField.value = ''; 
    renderHTML();
  }
}

function toDoComplete (index) {
  toDoArray[index].classList.add('todo-completed');
}

function removeToDo (index) {
  toDoArray.splice(index, 1);
}
