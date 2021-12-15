window.onload = initPage

function initPage(){
    getProjects().then(() => setEventListenersOnProjects());
}

async function getProjects(){
    let url="/api/projects/get-projects";
    let response = await fetch(url);
    let data = await response.json();
    writeProjectsToHtml(data);
}
async function getBoards(proj_id){
    let url="/api/projects/get-boards/"+proj_id;
    let response = await fetch(url);
    let data = await response.json();
    writeBoardsToHtml(data);
}
async function getStatuses(board_id){
    let url="/api/projects/get-statuses/"+board_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
async function getCards(status_id){
    let url="/api/projects/get-cards/"+status_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
function setEventListenersOnProjects(){
    const projects = document.querySelectorAll(".project-container");
    for(let proj of projects){
        proj.addEventListener('click', projectChose)
    }
}

let active_proj;
async function projectChose(event){
    const proj_id = event.target.parentElement.parentElement.querySelector(".project-id").textContent;

    if(!active_proj) {
        active_proj = event.target.parentElement.parentElement;
        active_proj.classList.replace("not-active-proj","active-proj");
    }else{
        active_proj.classList.replace("active-proj","not-active-proj");
        active_proj = event.target.parentElement.parentElement;
        active_proj.classList.replace("not-active-proj","active-proj");
    }

    await getBoards(proj_id);
}

/*function removeEventListenersFromProjects(){
    const projects = document.querySelectorAll(".project-container");
    for(let proj of projects){
        proj.removeEventListener('click', projectChose);
    }
}*/



function writeProjectsToHtml(projects){
    const proj_container = document.querySelector("#project-panel");
    if(!proj_container) return console.log("Error: '#disp-container' has not found on the page, please check");
    if(proj_container.firstChild) deleteChildren(proj_container);
    if(projects.length == 0) return emptyListMessage(proj_container);


    let proj_list="";
    for(let proj of projects){
        proj_list+=`
        <div class="project-container not-active-proj">
            <div class="project-id">${proj._id}</div>
            <div class="project-name"><h1>${proj.name}</h1></div>
            <div class="project-owner"><p>Project owner: ${proj.owner.name}</p></div>
        </div>
    `;
    }
    proj_container.insertAdjacentHTML("beforeend", proj_list);
}
async function writeBoardsToHtml(boards){
    const board_container = document.querySelector("#disp-container");
    if(!board_container) return console.log("Error: '#disp-container' has not found on the page, please check");
    if(board_container.firstChild) deleteChildren(board_container);
    if(boards.length == 0) return emptyListMessage(board_container);


    let board_list="";
    for(let board of boards){
        let statuses = await getStatuses(board._id);
        board_list+=`
        <div class="board-container">
            <div class="board-id">${board._id}</div>
            <div class="project-id">${board.project_id}</div>
            <div class="board-created-user"><p>Created user: ${board.created_user.name}</p></div>
            <div class="board-name"><h1>${board.name}</h1></div>`;
            for(let status of statuses){
                let cards = await getCards(status._id);
                board_list+=`
                <div class="status-container">
                    <div class="status-id">${status._id}</div>
                    <div class="status-name"><h1>${status.name}</h1></div>
                        <div class="cards-drop-zone">`;
                for(let card of cards){
                    board_list+=`
                    <div class="card-container">
                        <div class="card-id">${card._id}</div>
                        <div class="card-name">${card.name}</div>
                    </div> 
                    `;
                }
                board_list+=`
                    </div>
                </div>
                `;
            }
            board_list+=`
        </div>
    `;
    }
    board_container.insertAdjacentHTML("beforeend", board_list);
    initDragAndDrop();
}

function deleteChildren(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
function emptyListMessage(container){
    container.insertAdjacentHTML("beforeend", "No records found");
}

















function initDragAndDrop() {
    // Collect all draggable elements and drop zones
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

    // set draggable elements to draggable
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
    // we use these data during the drag operation to decide
    // if we handle this drag event or not
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
    initDataSync()
}


function dropZoneEnterHandler(e) {
    // we can only check the data transfer type, not the value for security reasons
    // https://www.w3.org/TR/html51/editing.html#drag-data-store-mode
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        this.classList.add("over-zone");
        // The default action of this event is to set the dropEffect to "none" this way
        // the drag operation would be disallowed here we need to prevent that
        // if we want to allow the dragged element to be drop here
        // https://developer.mozilla.org/en-US/docs/Web/API/Document/dragenter_event
        // https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/dropEffect
        e.preventDefault();
    }
}


function dropZoneOverHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box')) {
        // The default action is similar as above, we need to prevent it
        e.preventDefault();
    }
}


function dropZoneLeaveHandler(e) {
    if (e.dataTransfer.types.includes('type/dragged-box') &&
        e.relatedTarget !== null &&
        e.currentTarget !== e.relatedTarget.closest('.card-slot')) {
        // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/relatedTarget
        this.classList.remove("over-zone");
    }
}

function dropZoneDropHandler(e) {
    // We have checked in the "dragover" handler (dropZoneOverHandler) if it is allowed
    // to drop here, so it should be ok to move the element without further checks
    let draggedElement = document.querySelector('.dragged');
    e.currentTarget.appendChild(draggedElement);

    // We  drop default action (eg. move selected text)
    // default actions detailed here:
    // https://www.w3.org/TR/html51/editing.html#drag-and-drop-processing-model
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




async function initDataSync(){
    let cards = document.querySelectorAll(".card-container");
    for(let card of cards){
        //console.log(card);
        let card_id = card.querySelector(".card-id").textContent;
        let status_id = card.parentElement.parentElement.querySelector(".status-id").textContent;
        //console.log(status_id);
        let url=`/api/projects/move-card/${card_id}/${status_id}`;
        let response = await fetch(url,{
            method:'PUT'
        });
        let data = await response.json();
        //console.log(data);
    }
}