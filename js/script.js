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

    const render = () => {
        let htmlString = "";
        for(const task of tasks) {
            htmlString += `
                <li> 
                ${task.content}
                </li>
            `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const init = () => {
        render();
    };

    init();
}