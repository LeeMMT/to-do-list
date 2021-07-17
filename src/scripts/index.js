import '../css/cssreset.css'
import '../css/style.css';
import { QuickAddForm } from './quickAddFormModule';

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

    const optionTagCreator = function() {
        const arrayOfProjects = [];
        for (let i = 0; i < projects.length; i++) {
            const optionTag = document.createElement("option");
            optionTag.setAttribute("value", `${projects[i].title}`);
            optionTag.textContent = `${projects[i].title}`; 
            arrayOfProjects.push(optionTag);
        };
        return arrayOfProjects;
    };

    return {createNewProject, createNewToDo, optionTagCreator};
})();

QuickAddForm.quickAddBtn.addEventListener("click", () => QuickAddForm.openForm(DATACONTROL.optionTagCreator));