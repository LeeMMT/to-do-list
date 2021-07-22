const sidebar = (function() {
    const menuBtn = document.querySelector(".menu-icon").parentElement;
    const sidebar = document.querySelector(".sidebar");
    const projectList = document.querySelector("#project-list");

    const toggleSidebar = function() {
        sidebar.classList.toggle("sidebar-open");
    }

    function generateProjectNames(getProjects) {

        getProjects().forEach(obj => {
            const horizontalDiv = document.createElement("div");
            horizontalDiv.classList.add("flex-horizontal");
            horizontalDiv.classList.add("removable");

            const p = document.createElement("p");
            p.textContent = obj.projectName;

            horizontalDiv.appendChild(p);

            if (obj.entries > 0) {
                const num = document.createElement("p");
                num.textContent = obj.entries.length;
                horizontalDiv.appendChild(num);
            }

            projectList.appendChild(horizontalDiv);
        });
    }

    function updateSidebar(getProjects) {
        const elementsToRemove = document.querySelectorAll(".removable");
        elementsToRemove.forEach(element => element.remove());
        generateProjectNames(getProjects);
    }


    return {generateProjectNames, menuBtn, toggleSidebar, updateSidebar};
})();

export {sidebar};