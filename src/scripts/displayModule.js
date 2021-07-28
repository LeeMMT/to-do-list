const display = (function(getProjects) {
    let counter = 0;

    const div = document.querySelector("#project-task-area");

    const showTasks = function(e) {
        setTimeout(() => {
            this.children[0].classList.toggle("rotated-90");
            document.querySelector(`[data-i="${this.getAttribute('data-i')}"].task-div`).classList.toggle("visible");
        }, 0);
    }

    const loopData = function(obj) {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("flex-horizontal");

        const iconBg = document.createElement("div");
        const arrowIcon = document.createElement("i");
        iconBg.classList.add("icon-bg");
        iconBg.classList.add("small");
        iconBg.setAttribute("data-i", counter);
        arrowIcon.classList.add("arrow-right-icon");
        iconBg.appendChild(arrowIcon);

        const title = document.createElement("p");
        title.textContent = obj.projectName;

        titleDiv.appendChild(iconBg);
        titleDiv.appendChild(title);
        div.appendChild(titleDiv);
        
        const tasks = obj.entries;
        console.log(tasks);
        
        if (tasks) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-div");
            taskDiv.classList.add("flex-column");
            taskDiv.setAttribute("data-i", counter);
            tasks.forEach(item => {

                const taskContainer = document.createElement("div");
                taskContainer.classList.add("flex-column");
                
                const task = document.createElement("div");
                task.classList.add("task");
                task.classList.add("flex-horizontal");

                const bulletIcon = document.createElement("div");
                switch (item.priority) {
                    case "Low":
                        bulletIcon.classList.add("bullet-icon-grey");
                        break;
                    case "Medium":
                        bulletIcon.classList.add("bullet-icon-orange");
                        break;
                    case "High":
                        bulletIcon.classList.add("bullet-icon-red");
                        break;
                }

                const taskTitle = document.createElement("p");
                taskTitle.textContent = item.title;
                taskTitle.classList.add("semi-b");

                const taskDescription = document.createElement("p");
                taskDescription.textContent = item.description;

                task.appendChild(bulletIcon);
                task.appendChild(taskTitle);
                taskContainer.appendChild(task);
                taskContainer.appendChild(taskDescription);
                taskDiv.appendChild(taskContainer);
            });
            div.appendChild(taskDiv);
        }
        counter++;
    }

    const displayData = function(getProjects) {

        getProjects().forEach(loopData);
        const arrowIcons = document.querySelectorAll("#project-task-area .icon-bg")
        arrowIcons.forEach(item => item.addEventListener("click", showTasks));
        counter = 0;
    }

    return {displayData};
})();

export {display};