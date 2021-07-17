import '../css/cssreset.css'
import '../css/style.css';
import { QuickAddForm } from './quickAddFormModule';

const DATACONTROL = (function() {
    const projects =  [
        {projectName: "Tasks",
        entries: []},
        {projectName: "Tasks2",
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

        if (project) {
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].projectName === project) {
                    projects[i].entries.push({title, description})
                }
            }
        } else {
            projects.push({
                projectName: newProject, entries: [title, description]
            });
        }
        QuickAddForm.closeForm();
        console.log(projects);
    }

    return {createNewProject, createNewToDo, optionTagCreator, quickAdd};
})();

QuickAddForm.quickAddBtn.addEventListener("click", () => QuickAddForm.openForm(DATACONTROL.optionTagCreator, DATACONTROL.quickAdd));