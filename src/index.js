import './cssreset.css';
import './style.css';
const quickAddBtn = document.querySelector(".add-icon");

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