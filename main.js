const input = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const pendingList = document.getElementById('pending-list');
const completedList = document.getElementById('completed-list');
const pendingTitle = document.getElementById('pending-title');
const completedTitle = document.getElementById('completed-title');

const toggleSectionVisibility = (title, list) => {
  title.addEventListener('click', () => {
    list.classList.toggle('hidden');

    const icon = title.querySelector('i');
    icon.classList.toggle('fa-chevron-down');
    icon.classList.toggle('fa-chevron-up');
  });
};

const createTodoItem = (text, isCompleted = false) => {
  const item = document.createElement('li');
  item.className = 'todo-item';

  if (isCompleted) {
    item.classList.add('completed');
  }

  const span = document.createElement('span');
  span.textContent = text;

  const completeButton = document.createElement('button');
  completeButton.textContent = isCompleted ? 'Undo' : 'Complete';
  completeButton.className = 'complete';

  completeButton.addEventListener('click', () => {
    if (item.classList.contains('completed')) {
      item.classList.remove('completed');
      completeButton.textContent = 'Complete';
      pendingList.appendChild(item);
    } else {
      item.classList.add('completed');
      completeButton.textContent = 'Undo';
      completedList.appendChild(item);
    }
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.className = 'delete';

  deleteButton.addEventListener('click', () => {
    item.remove();
  });

  const buttonContainer = document.createElement('div');
  buttonContainer.appendChild(completeButton);
  buttonContainer.appendChild(deleteButton);

  item.appendChild(span);
  item.appendChild(buttonContainer);

  return item;
};

addButton.addEventListener('click', () => {
  const text = input.value.trim();

  if (text) {
    pendingList.appendChild(createTodoItem(text));
    input.value = '';
  }
});

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addButton.click();
  }
});

toggleSectionVisibility(pendingTitle, pendingList);
toggleSectionVisibility(completedTitle, completedList);