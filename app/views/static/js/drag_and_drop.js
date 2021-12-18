import { initCardPlaceSync } from '/static/js/requests/put_api_requests.js';


export function initDragAndDrop() {
    let draggables = document.querySelectorAll(".card-container");
    let dropZones = document.querySelectorAll(".cards-drop-zone");
    initDraggables(draggables);
    initDropZones(dropZones);
}

function initDraggables(draggables) {
    for (const draggable of draggables) {
        initDraggable(draggable);
    }
}

function initDropZones(dropZones) {
    for (let dropZone of dropZones) {
        initDropZone(dropZone);
    }
}

function initDraggable(draggable) {
    draggable.addEventListener("dragstart", dragStartHandler);
    draggable.addEventListener("drag", dragHandler);
    draggable.addEventListener("dragend", dragEndHandler);
    draggable.setAttribute("draggable", "true");

}


function initDropZone(dropZone) {

    dropZone.addEventListener("dragenter", dropZoneEnterHandler);
    dropZone.addEventListener("dragover", dropZoneOverHandler);
    dropZone.addEventListener("dragleave", dropZoneLeaveHandler);
    dropZone.addEventListener("drop", dropZoneDropHandler);
}


function dragStartHandler(e) {
    setDropZonesHighlight();

    this.classList.add('dragged', 'drag-feedback');
    e.dataTransfer.setData("type/dragged-box", 'dragged');
    e.dataTransfer.setData("text/plain", this.textContent.trim());
    deferredOriginChanges(this, 'drag-feedback');
}


function dragHandler() {
    let dropZones = document.querySelectorAll(".card-slot");
    for (let dropZone of dropZones) {
        dropZone.style.display="block";
        setTimeout(function(){
            dropZone.style.height="auto";
            dropZone.style.width="100%";
        }, 100);

    }

}

function dragEndHandler() {
    setDropZonesHighlight(false);
    this.classList.remove('dragged');
    let dropZones = document.querySelectorAll(".card-slot");
    for (let dropZone of dropZones) {
        dropZone.style.height="1px";
        dropZone.style.width="1px";
        dropZone.style.display="none";
    }
    initCardPlaceSync(this);
}


function dropZoneEnterHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        this.classList.add("over-zone");
        e.preventDefault();
    }
}


function dropZoneOverHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        e.preventDefault();
    }
}


function dropZoneLeaveHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.card-slot')) {
        this.classList.remove("over-zone");
    }
}

function dropZoneDropHandler(e) {
    let draggedElement = document.querySelector('.dragged');
    e.currentTarget.appendChild(draggedElement);
    e.preventDefault();
}

function setDropZonesHighlight(highlight = true) {
    const dropZones = document.querySelectorAll(".card-slot");
    for (const dropZone of dropZones) {
        if (highlight) {
            dropZone.classList.add("active-zone");
        } else {

            dropZone.classList.remove("active-zone");
            dropZone.classList.remove("over-zone");
        }
    }
}

function deferredOriginChanges(origin, dragFeedbackClassName) {
    setTimeout(() => {
        origin.classList.remove(dragFeedbackClassName);
    });
}
