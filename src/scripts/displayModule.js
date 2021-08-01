const display = (function(getProjects) {

    const div = document.querySelector("#project-task-area");

    const showTasks = function(e) {
        setTimeout(() => {
            this.children[0].classList.toggle("rotated-90");
            document.querySelector(`div[data-i="${this.getAttribute('data-i')}"].task-div`).classList.toggle("visible");
        }, 0);
    }

    const createTaskContainer = function(item, projectId) {
        const taskContainer = document.createElement("div");
                taskContainer.setAttribute("data-i", item.id);
                taskContainer.classList.add("flex-column");
                
                const task = document.createElement("div");
                task.classList.add("task");
                task.classList.add("flex-horizontal");

                const IconAndTitle = document.createElement("div");
                IconAndTitle.classList.add("flex-horizontal-inner");

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
                taskTitle.classList.add("semi-b");
                taskTitle.textContent = item.title;

                const deleteBtn = document.createElement("button");
                deleteBtn.textContent = "delete";
                deleteBtn.setAttribute("data-i", item.id);
                deleteBtn.classList.add("cancel-btn");
                deleteBtn.classList.add("font-size-small");

                const taskDescription = document.createElement("p");
                taskDescription.textContent = item.description;

                IconAndTitle.appendChild(bulletIcon);
                IconAndTitle.appendChild(taskTitle);
                task.appendChild(IconAndTitle);
                task.appendChild(deleteBtn);
                taskContainer.appendChild(task);
                taskContainer.appendChild(taskDescription);
                document.querySelector(`.task-div[data-i="${projectId}"]`).appendChild(taskContainer);
    }

    const loopData = function(obj) {
        const titleDiv = document.createElement("div");
        titleDiv.classList.add("flex-horizontal");

        const iconBg = document.createElement("div");
        const arrowIcon = document.createElement("i");
        iconBg.classList.add("icon-bg");
        iconBg.classList.add("small");
        iconBg.setAttribute("data-i", obj.id);
        arrowIcon.classList.add("arrow-right-icon");
        iconBg.appendChild(arrowIcon);

        const title = document.createElement("p");
        title.textContent = obj.projectName;

        titleDiv.appendChild(iconBg);
        titleDiv.appendChild(title);
        div.appendChild(titleDiv);
        
        const tasks = obj.entries;
        
        if (tasks) {
            const taskDiv = document.createElement("div");
            taskDiv.classList.add("task-div");
            taskDiv.classList.add("flex-column");
            taskDiv.setAttribute("data-i", obj.id);
            div.appendChild(taskDiv);
            tasks.forEach(item => createTaskContainer(item, obj.id));
        }
    }

    const displayData = function(getProjects, removeTask) {

        getProjects().forEach(loopData);
        const arrowIcons = document.querySelectorAll("#project-task-area .icon-bg");
        arrowIcons.forEach(item => item.addEventListener("click", showTasks));
        
        const deleteBtns = document.querySelectorAll(".cancel-btn");
        deleteBtns.forEach(item => item.addEventListener("click", removeTask));
    }

    const displayNewTask = function(project) {
        const id = project.id;
        const taskDiv = document.querySelector(`.task-div[data-i="${id}"]`);
        createTaskContainer(project.entries[project.entries.length - 1], id);
    }

    return {displayData, displayNewTask};
})();

export {display};