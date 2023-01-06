{
    let tasks = [];
    let hideDoneTasks = false;
  
    const addNewTask = (newTaskElement) => {
      tasks = [
        ...tasks,
        { content: newTaskElement },
      ];
      render();
    };
  
    const removeTask = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        ...tasks.slice(taskIndex + 1),
      ];
      render();
    };
  
    const toggleTaskDone = (taskIndex) => {
      tasks = [
        ...tasks.slice(0, taskIndex),
        {
          ...tasks[taskIndex],
          done: !tasks[taskIndex].done,
        },
        ...tasks.slice(taskIndex + 1),
      ];
      render();
    };
  
    const buttonAllHide = () => {
      hideDoneTasks = !hideDoneTasks;
      render();
    };
  
    const buttonAllDone = () => {
      tasks = tasks.map((task) => ({
        ...task,
        done: true,
      }));
  
      render();
    };
  
    const bindButtonsEvents = () => {
      const buttonAllHideButton = document.querySelector(".js-buttonAllHide");
  
      if (buttonAllHideButton) {
        buttonAllHideButton.addEventListener("click", buttonAllHide);
      }
  
      const buttonAllDoneButton = document.querySelector(".js-buttonAllDone");
  
      if (buttonAllDoneButton) {
        buttonAllDoneButton.addEventListener("click", buttonAllDone);
      }
    };
  
    const bindRemoveEvents = () => {
      const removeButtons = document.querySelectorAll(".js-remove");
  
      removeButtons.forEach((removeButton, index) => {
        removeButton.addEventListener("click", () => {
          removeTask(index);
        });
      });
    };
  
    const bindToggleEvents = () => {
      const toggleDoneButtons = document.querySelectorAll(".js-done");
  
      toggleDoneButtons.forEach((toggleDoneButton, index) => {
        toggleDoneButton.addEventListener("click", () => {
          toggleTaskDone(index);
        });
      });
    };
  
    const showButtons = () => {
      const tasksButtonsElement = document.querySelector(".js-tasksButtons");
  
      if (!tasks.length) {
        tasksButtonsElement.innerHTML = "";
        return;
      };
  
      tasksButtonsElement.innerHTML = `
      <button class="list__buttonAllHide js-buttonAllHide">
      ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
      </button>
      <button class="list__buttonAllDone js-buttonAllDone" 
      ${tasks.every(({ done }) => done) ? "disabled" : ""}>
      Ukończ wszystkie
      </button>
      `;
    };
  
    const renderTasks = () => {
      let htmlString = "";
  
      for (const task of tasks) {
        htmlString += `
          <li 
          class="list__item
          ${task.done && hideDoneTasks ? " list__item--hidden" : ""} js-tasks">
          <button class = "list__button list__button--done js-done">
          ${task.done ? "✓" : ""}
          </button>
          <span class="list__task
          ${task.done ? " list__taskDone" : ""}">
          ${task.content}
          </span>
          <button class="list__button list__button--remove js-remove">🗑</button>
          </li>
          `;
      }
  
      document.querySelector(".js-tasks").innerHTML = htmlString;
    };
  
    const render = () => {
      renderTasks();
      bindRemoveEvents();
      bindToggleEvents();
      showButtons();
      bindButtonsEvents();
    };
  
    const onFormSubmit = (event) => {
      event.preventDefault();
  
      const newTaskElement = document.querySelector(".js-newTask").value.trim();
      const newTaskContent = document.querySelector(".js-newTask");
  
      if (newTaskElement !== "") {
        addNewTask(newTaskElement);
        newTaskContent.value = "";
      }
      newTaskContent.focus();
    };
  
    const init = () => {
      render();
  
      const formElement = document.querySelector(".js-form");
  
      formElement.addEventListener("submit", onFormSubmit);
    };
  
    init();
  }