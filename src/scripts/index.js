import { fil } from 'date-fns/locale';
import '../css/cssreset.css'
import '../css/style.css';
import { QuickAddForm } from './quickAddFormModule';
import { sidebar } from './sidebarModule';
import { display } from './displayModule';

const DATACONTROL = (function() {

    let localStorageAvailable = null;

    let projects =  [
        {projectName: "How to Use",
        id: 0,
        entries: [{
            title: `Delete projects and Tasks`,
            description: `To delete a project, use the delete button adjacent to a project's title. To delete a task, simply hover over the task you wish to 
            delete. Doing so will cause the "delete" and "edit" buttons for that task to become visible.`,
            priority: `Low`,
            deadline: "",
            id: 0,
            },
            {
            title: `Edit your tasks`,
            description: `To edit the information in a task, hover over a task and click the edit button. You can edit a task's title, description, and 
            priority.`,
            priority: `Medium`,
            deadline: "",
            id: 1,
            },
            {
            title: `The sidebar & "quick-jumping"`,
            description: `The sidebar, brought up by clicking the menu icon in the top-left, presents you with a list of all of your projects, as well as the 
            number of tasks that each hold. If you can't find the project you are looking for, try clicking the corresponding project name in the sidebar to quick jump
             to it.`,
            priority: `High`,
            deadline: "",
            id: 2,
            }
        ]
        }
    ];

    const initializeLocalStorage = function() {

        if (typeof(Storage) !== "undefined") {
            localStorageAvailable = true;
            } else {
            localStorageAvailable = false;
        }
        if (window.localStorage.getItem('localProjects')) {
            projects = JSON.parse(window.localStorage.getItem('localProjects'));
        }
    }

    const generateId = function(array) {
        if (array.length > 0) {
            return array.length;
        } else {
            return 0;
        }
    }

    const decrementId = function(projectId, taskId) {

        for (let i = taskId; i < projects[projectId].entries.length; i++) {
            projects[projectId].entries[i].id -= 1;
            const newId = projects[projectId].entries[i].id;
            document.querySelector(`.task-div[data-i="${projectId}"] .edit-btn[data-i="${+i+1}"]`).setAttribute("data-i", `${i}`);
            document.querySelector(`.task-div[data-i="${projectId}"] .cancel-btn[data-i="${+i+1}"]`).setAttribute("data-i", `${i}`);
        }
    
    }

    const createNewToDo = function(title, description, priority, date, projectIndex) {
        const id = generateId(projects[projectIndex].entries);
        return {title, description, priority, date, id};
    }

    const createNewProject = function(projectName) {
        const id = generateId(projects);
        return {projectName, id, entries: []};
    }

    const removeTask = function(e) {
        
        if (this.classList.contains("projectDelete")) {
            const projectId = Number(this.getAttribute("data-i"));
            projects.splice(projectId, 1);
            document.querySelector(`.task-div[data-i="${projectId}"]`).remove();
            this.parentElement.remove();

            for (let i = projectId; i < projects.length; i++) {
                projects[i].id -= 1;
                document.querySelector(`.projectDelete[data-i="${i + 1}"]`).setAttribute("data-i", `${i}`);
                document.querySelector(`.task-div[data-i="${i + 1}"]`).setAttribute("data-i", `${i}`);
                document.querySelector(`.icon-bg.small[data-i="${i + 1}"]`).setAttribute("data-i", `${i}`);
            }
        } else {
            const projectId = this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-i");
            const taskId = this.getAttribute("data-i");
            
            this.parentElement.parentElement.parentElement.remove();
            projects[projectId].entries.splice(taskId, 1);
            decrementId(projectId, taskId);
        }
        
        if (localStorageAvailable) window.localStorage.setItem('localProjects', JSON.stringify(projects));
        sidebar.updateSidebar(getProjects);
    }

    const checkOptionLength = function(option) {
        if (option.length > 40) {
            return option.slice(0, 41) + "...";
        } else {
            return option;
        }
    }

    const optionTagCreator = function() {
        const arrayOfProjects = [];
        for (let i = 0; i < projects.length; i++) {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("value", `${projects[i].projectName}`);
            optionTag.textContent = checkOptionLength(projects[i].projectName);
            arrayOfProjects.push(optionTag);
            };
            return arrayOfProjects;
        };

    const quickAdd = function() {

        const date = document.querySelector("#date").value;
        console.log(date);
        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        const selectTag = document.querySelector("#project");
        const project = document.querySelector("#project").value;
        const newProject = document.querySelector("#new-project").value;

        if (validateQuickAdd(title, description, project, newProject) === false) {
            return;
        }

        if (!project) {
            projects.push(createNewProject(newProject));
            display.displayNewProject(projects[projects.length - 1], removeTask);
            }

        if (project) {
            const index = selectTag.selectedIndex - 1;
            projects[index].entries.push(createNewToDo(title, description, QuickAddForm.getPriority(), date, index));
        } else {
            const index = projects[projects.length - 1].id;
            projects[index].entries.push(createNewToDo(title, description, QuickAddForm.getPriority(), date, index));
        };
        

        if (localStorageAvailable) window.localStorage.setItem('localProjects', JSON.stringify(projects));
        QuickAddForm.closeForm();
        sidebar.updateSidebar(getProjects);

        let projectToPass = (project) ? project : newProject;
        projectToPass = projects.find(element => element.projectName === projectToPass);
        display.displayNewTask(projectToPass, removeTask, QuickAddForm.openEdit, saveEdit, getProjects);
    }

    const saveEdit = function(projectId, taskId, taskDiv) {

        const title = document.querySelector("#title").value;
        const description = document.querySelector("#description").value;
        let dateString;
        if (document.querySelector("#date").value) {
            dateString = document.querySelector("#date").value;
        }

        if (validateSaveEdit(projectId, taskId, title, description) === false) {
            return;
        }

        projects[projectId].entries[taskId].title = title;
        projects[projectId].entries[taskId].description = description;
        if (dateString) projects[projectId].entries[taskId].date = dateString;

        const newPriority = QuickAddForm.getPriority();
        projects[projectId].entries[taskId].priority = newPriority;

        if (localStorageAvailable) window.localStorage.setItem('localProjects', JSON.stringify(projects));
        
        QuickAddForm.closeForm();
        
        const updatedBulletIcon = taskDiv.children[0].firstChild.firstChild;
        updatedBulletIcon.className = "";
        switch (newPriority) {
            case "Low":
                updatedBulletIcon.classList.add("bullet-icon-grey");
                break;
            case "Medium":
                updatedBulletIcon.classList.add("bullet-icon-orange");
                break;
            case "High":
                updatedBulletIcon.classList.add("bullet-icon-red");
                break;
        }
        
        taskDiv.children[0].firstChild.lastChild.textContent = title;
        if (dateString && taskDiv.children.length === 3) {
            taskDiv.children[1].textContent = `Deadline: ${dateString}`;
            taskDiv.children[2].textContent = description;
        } else if (dateString && taskDiv.children.length === 2) {
            const date = document.createElement("p");
            date.classList.add("deadline");
            date.textContent = `Deadline: ${dateString}`;
            taskDiv.insertBefore(date, taskDiv.children[1]);
            taskDiv.children[2].textContent = description;           
        } else {
            taskDiv.children[1].textContent = description;
        }

        sidebar.updateSidebar(getProjects);
    }

    const taskExists = function(project, taskName) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName === project) {
                return projects[i].entries.find(element => element.title === taskName);
            }
        }
    }

    const editTaskExists = function(projectId, taskId, title) {
        projects[projectId].entries.some(item => item.id !== taskId && item.title === title);
    }

    const validateQuickAdd = function(title, description, project, newProject) {

        if (!title || !description || (!project && !newProject)) {
            alert("Please fill in the form");
            return false;
        } else if (projects.find(element => element.projectName === newProject)) {
            alert(`A project with the name "${newProject}" already exists`);
            return false;
        } else if (taskExists(project, title)) {
            alert(`A task with the name "${title}" already exists inside "${project}"`);
            return false;
        } else {
            return true;
        }
    }

    const validateSaveEdit = function(projectId, taskId, title, description) {
        
        if (!title || !description) {
            alert("Please fill in the form");
            return false;
        } else if (editTaskExists(projectId, taskId, title)) {
            alert(`A task with the name "${title}" already exists inside "${projects[projectId].projectName}"`);
            return false;
        } else {
            return true;
        }
    }

    const getProjects = function() {
        return projects;
    }

    initializeLocalStorage();
    return {createNewProject, createNewToDo, removeTask, optionTagCreator, quickAdd, saveEdit, getProjects};
})();

sidebar.generateProjectNames(DATACONTROL.getProjects);
sidebar.menuBtn.addEventListener("click", sidebar.toggleSidebar);
QuickAddForm.quickAddBtn.addEventListener("click", () => QuickAddForm.openForm(DATACONTROL.optionTagCreator, DATACONTROL.quickAdd));
display.displayData(DATACONTROL.getProjects, DATACONTROL.removeTask, QuickAddForm.openEdit, DATACONTROL.saveEdit);