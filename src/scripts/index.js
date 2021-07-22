import { fil } from 'date-fns/locale';
import '../css/cssreset.css'
import '../css/style.css';
import { QuickAddForm } from './quickAddFormModule';
import { sidebar } from './sidebarModule';

const DATACONTROL = (function() {
    const projects =  [
        {projectName: "Tasks",
        entries: []},
        {projectName: "Tasks2",
        entries: []}
    ];

    const createNewToDo = function(title, description, priority) {
        return {title, description, priority};
    }

    const createNewProject = function(projectName) {
        return {projectName, entries: []};
    }

    const optionTagCreator = function() {
        const arrayOfProjects = [];
        for (let i = 0; i < projects.length; i++) {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("value", `${projects[i].projectName}`);
            optionTag.textContent = `${projects[i].projectName}`; 
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
                projects[i].entries.push(createNewToDo(title, description, QuickAddForm.getPriority()));
            }
        }
        QuickAddForm.closeForm();
        sidebar.updateSidebar(getProjects);
    }

    const validateQuickAdd = function(title, description, project, newProject) {
        if (!title || !description || (!project && !newProject)) {
            alert("Please fill in the form");
            return false;
        } else {
            console.log(projects);
            return true;
        }
    }

    const getProjects = function() {
        return projects;
    }

    return {createNewProject, createNewToDo, optionTagCreator, quickAdd, getProjects};
})();

sidebar.generateProjectNames(DATACONTROL.getProjects);
sidebar.menuBtn.addEventListener("click", sidebar.toggleSidebar);
QuickAddForm.quickAddBtn.addEventListener("click", () => QuickAddForm.openForm(DATACONTROL.optionTagCreator, DATACONTROL.quickAdd));