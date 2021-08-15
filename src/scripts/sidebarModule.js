const sidebar = (function() {
    const menuBtn = document.querySelector(".menu-icon").parentElement;
    const sidebar = document.querySelector(".sidebar");
    const projectList = document.querySelector("#project-list");

    const toggleSidebar = function() {
        sidebar.classList.toggle("sidebar-open");
    }

    const quickJump = function(e, getProjects) {
        const dataAttribute = Number(e.srcElement.getAttribute("data-i"));
        const arrows = document.querySelectorAll(".icon-bg.small");
        const taskDivs = document.querySelectorAll(".task-div");

        for (let i = 0; i < getProjects().length; i++) {
            if (i === dataAttribute) {
                arrows[i].firstChild.classList.add("rotated-90");
                taskDivs[i].classList.add("visible");
            } else {
                arrows[i].firstChild.classList.remove("rotated-90");
                taskDivs[i].classList.remove("visible");
            }
        }
    }

    function generateProjectNames(getProjects) {

        getProjects().forEach(obj => {
            const horizontalDiv = document.createElement("div");
            horizontalDiv.classList.add("flex-horizontal");
            horizontalDiv.classList.add("removable");
            horizontalDiv.setAttribute("data-i", `${obj.id}`);

            const p = document.createElement("p");
            p.textContent = obj.projectName;
            horizontalDiv.appendChild(p);

            if (obj.entries.length > 0) {
                const num = document.createElement("p");
                num.classList.add("task-num");
                num.textContent = obj.entries.length;
                horizontalDiv.appendChild(num);
            }

            projectList.appendChild(horizontalDiv);
            horizontalDiv.addEventListener("click", e => {
                quickJump(e, getProjects);
            });
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