const toDoArray = [];

const inputField = document.getElementById('js-todo-input');
const toDoBtn = document.querySelector('.js-input-btn');
const addBtn = document.getElementById('js-add-btn');
const toDoHTML = document.getElementById('js-todo-HTML');


toDoBtn.addEventListener('click', () => {
  inputField.focus();
});


addBtn.addEventListener('click', () => {
  addToDo();
});

const deleteToDo = document.getElementById('.js-todo-delete');


function renderHTML () {
  toDoHTML.innerHTML = '';

  toDoArray.forEach((toDoName, index) => {
    const toDoElement = document.createElement('li');
    toDoElement.className = 'to-do-list-container'; 
    toDoElement
      .innerHTML += 
      `
        <span>
          <span id="js-todo-done" 
          class="material-symbols-outlined generated-btns-props js-done-btns">
            done
          </span>
        </span>

        <span>
          <span>
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
      const todoItem = event.target.parentElement;
      if (todoItem) {
        const index = Array.from(toDoHTML.firstElementChild).indexOf(todoItem);
        // todoItem.remove();
        removeToDo(index);
        renderHTML();
      }
    }
});
  
}

function addToDo () {
  const inputValue = inputField.value.trim();

  if (inputValue !== '') {
    toDoArray.push(inputValue);
    inputField.value = ''; 
    renderHTML();
  }
}

function removeToDo (index) {
  toDoArray.splice(index, 1);
}
