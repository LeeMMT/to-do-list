import './cssreset.css';
import './style.css';

const DATACONTROL = (function() {
    const projects =  [
        {title: "Tasks",
        entries: []}
    ];

    const createNewProject = function(title) {
        let entries = [];
        projects.push({title, entries});
    }

    const createNewToDo = function(title, description, dueDate, priority, projectName) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].title === projectName) {
                projects[i].entries.push({title, description, dueDate, priority});
            }
        }
    }
    return {createNewProject, createNewToDo};
})();

const QuickAddForm = (function() {
    const quickAddBtn = document.querySelector(".add-icon");
    const createForm = function() {
        const form = document.createElement("form");
        form.classList.add("quickAddGrid");

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.setAttribute("id", "title-l");
        titleLabel.textContent = "Title";

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");

        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description");
        descriptionLabel.setAttribute("id", "description-l");
        descriptionLabel.textContent = "Description";

        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("id", "description");
        descriptionInput.setAttribute("name", "description");

        const projectLabel = document.createElement("label");
        projectLabel.setAttribute("for", "project");
        projectLabel.setAttribute("id", "project-l");

        const projectRow = document.createElement("div");
        projectRow.classList.add("project-row");

        const select = document.createElement("select");
        select.setAttribute("id", "project");
        select.setAttribute("name", "project");
        
        const opt1 = document.createElement("option");
        opt1.setAttribute("value", "");
        opt1.setAttribute("selected", "true");
        opt1.setAttribute("disabled", "true");
        opt1.setAttribute("hidden", "true");
        opt1.textContent = "Existing project";

        const newProjectLabel = document.createElement("label");
        newProjectLabel.setAttribute("for", "newProject");
        newProjectLabel.style.display = "none";
        newProjectLabel.textContent = "Or create a new project";

        const newProjectInput = document.createElement("input");
        newProjectInput.setAttribute("type", "text");
        newProjectInput.setAttribute("name", "new-project");
        newProjectInput.setAttribute("id", "new-project");
        newProjectInput.setAttribute("placeholder", "or create a new project");

        const flexHorizontal = document.createElement("div");
        flexHorizontal.classList.add("flex-horizontal");

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.textContent = "Add";

        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(projectLabel);

        select.appendChild(opt1);
        projectRow.appendChild(select);
        projectRow.appendChild(newProjectLabel);
        projectRow.appendChild(newProjectInput);

        form.appendChild(projectRow);

        flexHorizontal.appendChild(cancelBtn);
        flexHorizontal.appendChild(addBtn);

        form.appendChild(flexHorizontal);
    }
    return {createForm};
})();