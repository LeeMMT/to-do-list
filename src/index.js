import './cssreset.css';
import './style.css';

const DATACONTROL = (function() {
    let projects =  [
        {title: "default",
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

console.log("test");