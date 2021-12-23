import { initCardPlaceSync } from '/static/js/requests/put_api_requests.js';
import { showErrorMessage } from '/static/js/DOM.js';


export function initDragAndDrop() {
    try {
        let draggables = document.querySelectorAll(".card-container");
        let dropZones = document.querySelectorAll(".cards-drop-zone");
        initDraggables(draggables);
        initDropZones(dropZones);
    }catch(ex){
        showErrorMessage(ex.message);
    }
}

function initDraggables(draggables) {
    try{
        for (const draggable of draggables) {
            initDraggable(draggable);
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function initDropZones(dropZones) {
    try{
        for (let dropZone of dropZones) {
            initDropZone(dropZone);
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function initDraggable(draggable) {
    try{
        draggable.addEventListener("dragstart", dragStartHandler);
        draggable.addEventListener("drag", dragHandler);
        draggable.addEventListener("dragend", dragEndHandler);
        draggable.setAttribute("draggable", "true");
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function initDropZone(dropZone) {
    try{
        dropZone.addEventListener("dragenter", dropZoneEnterHandler);
        dropZone.addEventListener("dragover", dropZoneOverHandler);
        dropZone.addEventListener("dragleave", dropZoneLeaveHandler);
        dropZone.addEventListener("drop", dropZoneDropHandler);
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function dragStartHandler(e) {
    try{
        setDropZonesHighlight();

        this.classList.add('dragged', 'drag-feedback');
        e.dataTransfer.setData("type/dragged-box", 'dragged');
        e.dataTransfer.setData("text/plain", this.textContent.trim());
        deferredOriginChanges(this, 'drag-feedback');
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function dragHandler() {
    try{
        let dropZones = document.querySelectorAll(".card-slot");
        for (let dropZone of dropZones) {
            dropZone.style.display="block";
            setTimeout(function(){
                dropZone.style.height="auto";
                dropZone.style.width="100%";
            }, 100);
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function dragEndHandler() {
    try{
        setDropZonesHighlight(false);
        this.classList.remove('dragged');
        let dropZones = document.querySelectorAll(".card-slot");
        for (let dropZone of dropZones) {
            dropZone.style.height="1px";
            dropZone.style.width="1px";
            dropZone.style.display="none";
        }
        initCardPlaceSync(this);
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function dropZoneEnterHandler(e) {
    try{
        if (e.dataTransfer.types.includes('type/dragged-box')) {
            this.classList.add("over-zone");
            e.preventDefault();
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function dropZoneOverHandler(e) {
    try{
        if (e.dataTransfer.types.includes('type/dragged-box')) {
            e.preventDefault();
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function dropZoneLeaveHandler(e) {
    try{
        if (e.dataTransfer.types.includes('type/dragged-box') &&
            e.relatedTarget !== null &&
            e.currentTarget !== e.relatedTarget.closest('.card-slot')) {
            this.classList.remove("over-zone");
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function dropZoneDropHandler(e) {
    try{
        let draggedElement = document.querySelector('.dragged');
        e.currentTarget.appendChild(draggedElement);
        e.preventDefault();
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function setDropZonesHighlight(highlight = true) {
    try{
        const dropZones = document.querySelectorAll(".card-slot");
        for (const dropZone of dropZones) {
            if (highlight) {
                dropZone.classList.add("active-zone");
            } else {

                dropZone.classList.remove("active-zone");
                dropZone.classList.remove("over-zone");
            }
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

function deferredOriginChanges(origin, dragFeedbackClassName) {
    try{
        setTimeout(() => {
            origin.classList.remove(dragFeedbackClassName);
        });
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
