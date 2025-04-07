/* The following code has been used provided by the following: https://youtu.be/9nJxybp7CEc?si=qfuDhZVPpxHN7Vtd */

document.body.addEventListener("click", (ev) => {
    const isExpandableTitle = !!ev.target.closest(".expandable__title-bar");
    const expandable = ev.target.closest(".expandable");

    if (!isExpandableTitle) {
        return;
    }

    expandable.classList.toggle("expandable--open");
});