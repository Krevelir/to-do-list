{
    const tasks = [
        {
            content: "complete a JS course module",
            done: false,
        },
        {
            content: "put some clothes on",
            done: true,
        },
    ]
    
    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };
   
    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done =  !tasks[taskIndex].done;
        render ();
    }

    const bindEvents = () => {
        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, taskIndex) => {
            removeButton.addEventListener("click", () => {
                removeTask(taskIndex);
            });
        })

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        })
    } 

    const render = () => {
        let htmlString = ""
        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? " style=\"text-decoration: line-through\"" : ""}>
            <button class = "js-done">completed?</button>
            ${task.content}
            <button class="js-remove">remove</button>
            </li>
            `;

            bindEvents();
        };  
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit)
    };

    init();
}