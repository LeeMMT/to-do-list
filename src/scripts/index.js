import { fil } from 'date-fns/locale';
import '../css/cssreset.css'
import '../css/style.css';
import { QuickAddForm } from './quickAddFormModule';
import { sidebar } from './sidebarModule';
import { display } from './displayModule';

const DATACONTROL = (function() {

    let localStorageAvailable = null;

    let projects =  [
        {projectName: "Example Project",
        id: 0,
        entries: []
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
            document.querySelector(`.task-div[data-i="${projectId}"] button[data-i="${+i+1}"]`).setAttribute("data-i", `${newId}`);
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
        const projectId = this.parentElement.parentElement.parentElement.getAttribute("data-i");
        const taskId = this.getAttribute("data-i");
        this.parentElement.parentElement.remove();
        projects[projectId].entries.splice(taskId, 1);
        decrementId(projectId, taskId);

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
        const project = document.querySelector("#project").value;
        const newProject = document.querySelector("#new-project").value;

        if (validateQuickAdd(title, description, project, newProject) === false) {
            return;
        }

        if (!project) {
            projects.push(createNewProject(newProject));
            }

        for (let i = 0; i < projects.length; i++) {
            if (projects[i].projectName === project || newProject) {
                const projectIndex = i;
                projects[i].entries.push(createNewToDo(title, description, QuickAddForm.getPriority(), projectIndex));
            }
        }

        if (localStorageAvailable) window.localStorage.setItem('localProjects', JSON.stringify(projects));
        QuickAddForm.closeForm();
        sidebar.updateSidebar(getProjects);

        let projectToPass = (project) ? project : newProject;
        projectToPass = projects.find(element => element.projectName === projectToPass);
        display.displayNewTask(projectToPass);
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
display.displayData(DATACONTROL.getProjects, DATACONTROL.removeTask);