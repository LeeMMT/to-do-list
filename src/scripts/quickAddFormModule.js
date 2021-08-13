const QuickAddForm = (function() {
    const quickAddBtn = document.querySelector(".add-icon").parentElement;
    let priorityLevel = "Low";

    const setPriority = function(e) {
        
        const flagIcon = document.querySelector(".utility-icon-bg i");
        flagIcon.className = "";
        priorityLevel = this.textContent;

        switch (priorityLevel) {
            case "Low":
                flagIcon.classList.add("flag-grey-icon");
                break;
            case "Medium":
                flagIcon.classList.add("flag-orange-icon");
                break;
            case "High":
                flagIcon.classList.add("flag-red-icon");
                break;
        }
        
        document.querySelector("#priority-div").remove();
    }

    function getPriority() {
        return priorityLevel;
    }

    const openPriority = function() {
        const priorityDiv = document.createElement("div");
        priorityDiv.setAttribute("id", "priority-div");

        const priority1 = document.createElement("div");
        priority1.classList.add("flex-horizontal");

        const p1Flag = document.createElement("i");
        p1Flag.classList.add("flag-red-icon");

        const p1Text = document.createElement("p");
        p1Text.textContent = "High";

        priority1.appendChild(p1Flag);
        priority1.appendChild(p1Text);
        priorityDiv.appendChild(priority1);

        const priority2 = document.createElement("div");
        priority2.classList.add("flex-horizontal");

        const p2Flag = document.createElement("i");
        p2Flag.classList.add("flag-orange-icon");

        const p2Text = document.createElement("p");
        p2Text.textContent = "Medium";

        priority2.appendChild(p2Flag);
        priority2.appendChild(p2Text);
        priorityDiv.appendChild(priority2);

        const priority3 = document.createElement("div");
        priority3.classList.add("flex-horizontal");

        const p3Flag = document.createElement("i");
        p3Flag.classList.add("flag-grey-icon");

        const p3Text = document.createElement("p");
        p3Text.textContent = "Low";

        priority3.appendChild(p3Flag);
        priority3.appendChild(p3Text);
        priorityDiv.appendChild(priority3);
        document.querySelector("#utility-bar").appendChild(priorityDiv);

        const priorityDivCollection = document.querySelectorAll("#priority-div .flex-horizontal");
        priorityDivCollection.forEach(item => item.addEventListener("click", setPriority));
    }

    const closeForm = function() {
        
        setTimeout(() => {
            quickAddBtn.children[0].classList.toggle("add-icon-rotated");
            document.querySelector(".dark-bg").classList.toggle("visible");
            document.querySelector("body").classList.toggle("hidden");
            document.querySelector("body > .container").classList.toggle("blur");
        }, 0);

        document.querySelector("#utility-bar").remove();
        document.querySelector(".form-bg").remove();
        priorityLevel = "Low";
    }

    const openForm = function(optionCallback, quickAddCallback) {
        
        if (document.querySelector(".quickAddGrid") || document.querySelector(".edit-task-grid")) {
            closeForm();
            return;
        };

        setTimeout(() => {
            quickAddBtn.children[0].classList.toggle("add-icon-rotated");
            document.querySelector(".dark-bg").classList.toggle("visible");
            document.querySelector("body").classList.toggle("hidden");
            document.querySelector("body > .container").classList.toggle("blur");
        }, 0);

        const formBg = document.createElement("div");
        formBg.classList.add("form-bg");

        const utilityBar = document.createElement("div");
        utilityBar.setAttribute("id", "utility-bar");
        utilityBar.classList.add("flex-horizontal");

        const priorityIconBg = document.createElement("div");
        priorityIconBg.classList.add("utility-icon-bg");

        const priorityIcon = document.createElement("i");
        priorityIcon.classList.add("flag-grey-icon");

        const form = document.createElement("form");
        form.classList.add("quickAddGrid");

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.setAttribute("id", "title-l");
        titleLabel.textContent = "Title:";

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");

        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description");
        descriptionLabel.setAttribute("id", "description-l");
        descriptionLabel.textContent = "Description:";

        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("id", "description");
        descriptionInput.setAttribute("name", "description");

        const projectLabel = document.createElement("label");
        projectLabel.setAttribute("for", "project");
        projectLabel.setAttribute("id", "project-l");
        projectLabel.textContent = "Project:";

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
        newProjectLabel.textContent = "Or create a new project...";

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

        cancelBtn.addEventListener("click", closeForm);

        const addBtn = document.createElement("button");
        addBtn.classList.add("add-btn");
        addBtn.textContent = "Add";
        addBtn.setAttribute("type", "button");

        priorityIconBg.appendChild(priorityIcon);
        utilityBar.appendChild(priorityIconBg);
        form.appendChild(utilityBar);
        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);
        form.appendChild(projectLabel);

        select.appendChild(opt1);
        const optionArray = optionCallback();
        optionArray.forEach(item => select.appendChild(item));

        projectRow.appendChild(select);
        projectRow.appendChild(newProjectLabel);
        projectRow.appendChild(newProjectInput);

        form.appendChild(projectRow);

        flexHorizontal.appendChild(cancelBtn);
        flexHorizontal.appendChild(addBtn);

        form.appendChild(flexHorizontal);

        formBg.appendChild(form);

        document.querySelector("body").appendChild(formBg);

        priorityIconBg.addEventListener("click", openPriority);

        const existingOrNew = function(e) {
            (this.id === "project") ? newProjectInput.value = "" : select.selectedIndex = 0;
        }

        select.addEventListener("change", existingOrNew);
        newProjectInput.addEventListener("input", existingOrNew);
        addBtn.addEventListener("click", quickAddCallback);
    }

    const openEdit = function(e, getProjects, saveEdit) {

        if (document.querySelector(".quickAddGrid") || document.querySelector(".edit-task-grid")) {
            closeForm();
            return;
        };

        const projectId = Number(e.srcElement.parentElement.parentElement.parentElement.parentElement.getAttribute("data-i"));
        const taskId = Number(e.srcElement.getAttribute("data-i"));
        const taskDiv = e.srcElement.parentElement.parentElement.parentElement;
        const projects = getProjects();

        setTimeout(() => {
            quickAddBtn.children[0].classList.toggle("add-icon-rotated");
            document.querySelector(".dark-bg").classList.toggle("visible");
            document.querySelector("body").classList.toggle("hidden");
            document.querySelector("body > .container").classList.toggle("blur");
        }, 0);

        const formBg = document.createElement("div");
        formBg.classList.add("form-bg");

        const utilityBar = document.createElement("div");
        utilityBar.setAttribute("id", "utility-bar");
        utilityBar.classList.add("flex-horizontal");

        const header = document.createElement("p");
        header.classList.add("font-size-small");
        header.classList.add("edit-header");
        header.textContent = "edit task...";

        const priorityIconBg = document.createElement("div");
        priorityIconBg.classList.add("utility-icon-bg");

        const priorityIcon = document.createElement("i");

        priorityLevel = projects[projectId].entries[taskId].priority;

        switch (priorityLevel) {
            case "Low":
                priorityIcon.classList.add("flag-grey-icon");
                break;
            case "Medium":
                priorityIcon.classList.add("flag-orange-icon");
                break;
            case "High":
                priorityIcon.classList.add("flag-red-icon");
                break;
        }

        const form = document.createElement("form");
        form.classList.add("edit-task-grid");

        const titleLabel = document.createElement("label");
        titleLabel.setAttribute("for", "title");
        titleLabel.setAttribute("id", "title-l");
        titleLabel.textContent = "Title:";

        const titleInput = document.createElement("input");
        titleInput.setAttribute("type", "text");
        titleInput.setAttribute("id", "title");
        titleInput.setAttribute("name", "title");
        titleInput.value = projects[projectId].entries[taskId].title;
        
        const descriptionLabel = document.createElement("label");
        descriptionLabel.setAttribute("for", "description");
        descriptionLabel.setAttribute("id", "description-l");
        descriptionLabel.textContent = "Description:";

        const descriptionInput = document.createElement("textarea");
        descriptionInput.setAttribute("id", "description");
        descriptionInput.setAttribute("name", "description");
        descriptionInput.textContent = projects[projectId].entries[taskId].description;

        const flexHorizontal = document.createElement("div");
        flexHorizontal.classList.add("flex-horizontal");

        const cancelBtn = document.createElement("button");
        cancelBtn.classList.add("cancel-btn");
        cancelBtn.textContent = "Cancel";

        cancelBtn.addEventListener("click", closeForm);

        const saveBtn = document.createElement("button");
        saveBtn.classList.add("add-btn");
        saveBtn.textContent = "Save";
        saveBtn.setAttribute("type", "button");

        priorityIconBg.appendChild(priorityIcon);
        utilityBar.appendChild(header);
        utilityBar.appendChild(priorityIconBg);
        form.appendChild(utilityBar);
        form.appendChild(titleLabel);
        form.appendChild(titleInput);
        form.appendChild(descriptionLabel);
        form.appendChild(descriptionInput);

        flexHorizontal.appendChild(cancelBtn);
        flexHorizontal.appendChild(saveBtn);

        form.appendChild(flexHorizontal);

        formBg.appendChild(form);

        document.body.appendChild(formBg);

        priorityIconBg.addEventListener("click", openPriority);

        saveBtn.addEventListener("click", () => {
            saveEdit(projectId, taskId, taskDiv);
        });
    }

    return {quickAddBtn, openForm, openEdit, closeForm, openPriority, priorityLevel, getPriority};
})();

export {QuickAddForm};