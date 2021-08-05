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
            id: 0,
            },
            {
            title: `Edit your tasks`,
            description: `To edit the information in a task, hover over a task and click the edit button. You can edit a task's title, description, and 
            priority.`,
            priority: `Medium`,
            id: 1,
            },
            {
            title: `The sidebar`,
            description: `The sidebar, brought up by clicking the menu icon in the top-left, presents you with a list of all of your projects, as well as the 
            number of tasks that each hold. If you can't find the project you are looking for, try clicking the corresponding project name in the sidebar.`,
            priority: `High`,
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

    const decrementProjectId = function(projectId) {
        for (let i = projectId; i < projects.length + 1; i++) {

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

    const createNewToDo = function(title, description, priority, projectIndex) {
        const id = generateId(projects[projectIndex].entries);
        return {title, description, priority, id};
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
            }
        } else {
            const projectId = this.parentElement.parentElement.parentElement.parentElement.getAttribute("data-i");
            const taskId = this.getAttribute("data-i");
            console.log(projectId);
            console.log(taskId);
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
            projects[index].entries.push(createNewToDo(title, description, QuickAddForm.getPriority(), index));
        } else {
            const index = projects[projects.length - 1].id;
            projects[index].entries.push(createNewToDo(title, description, QuickAddForm.getPriority(), index));
        };
        

        if (localStorageAvailable) window.localStorage.setItem('localProjects', JSON.stringify(projects));
        QuickAddForm.closeForm();
        sidebar.updateSidebar(getProjects);

        let projectToPass = (project) ? project : newProject;
        projectToPass = projects.find(element => element.projectName === projectToPass);
        display.displayNewTask(projectToPass, removeTask, QuickAddForm.openEdit, getProjects);
    }

    const taskExists = function(project, taskName) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName === project) {
                return projects[i].entries.find(element => element.title === taskName);
            }
        }
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

    const getProjects = function() {
        return projects;
    }

    initializeLocalStorage();
    return {createNewProject, createNewToDo, removeTask, optionTagCreator, quickAdd, getProjects};
})();

sidebar.generateProjectNames(DATACONTROL.getProjects);
sidebar.menuBtn.addEventListener("click", sidebar.toggleSidebar);
QuickAddForm.quickAddBtn.addEventListener("click", () => QuickAddForm.openForm(DATACONTROL.optionTagCreator, DATACONTROL.quickAdd));
display.displayData(DATACONTROL.getProjects, DATACONTROL.removeTask, QuickAddForm.openEdit);