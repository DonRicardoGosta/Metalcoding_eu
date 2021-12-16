window.onload = initPage

const card_colors = ["rgba(0,100,0,1)","rgba(255, 136, 0, 1)","rgba(14, 82, 171, 1)"];
const status_colors = ["rgba(120, 204, 141,1)","rgba(255, 215, 128, 1)","rgba(145, 207, 255, 1)"];

async function initPage(){
    await getProjects().then(setEventListenersOnProjects);
    document.querySelector(".project-container").click(); //click on the first project
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
    writeBoardsToHtml(data).then(setEventListenersOnBoardSizeArrows).then(setEventListenerOnStatusMenus).then(setEventListenerOnAddCard);
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



async function addMewCard(status_id){
    let url="/api/projects/new-card/"+status_id;
    let response = await fetch(url,{
        method:'POST'
    });
    let data = await response.json();
    return data;
}
async function updateCard(card_id,new_name){
    let url=`/api/projects/rename-card/${card_id}/${new_name}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}






function setEventListenersOnProjects(){
    const projects = document.querySelectorAll(".project-container");
    for(let proj of projects){
        proj.addEventListener('click', projectChose)
    }
}

function setEventListenersOnBoardSizeArrows(){
    const board_size_arrows = document.querySelectorAll(".board-size-icon");
    for(let board_size of board_size_arrows){
        board_size.addEventListener('click', changeBoardSize)
    }
}
function setEventListenerOnStatusMenus(){
    const status_menus = document.querySelectorAll(".status-menu-icon");
    for(let menu of status_menus){
        menu.addEventListener('click', changeStatusMenuDisplay)
    }
}
function setEventListenerOnAddCard(){
    const add_card_menus = document.querySelectorAll(".add-card");
    for(let menu of add_card_menus){
        menu.addEventListener('click', displayNewCard)
    }
}
function setEventListenerOnNewCardSubmit(){
    const submit = document.querySelector(".this-is-the-newest-card");
    submit.querySelector(".submit-button").addEventListener('click',newCardNameSubmitted)
}











function newCardNameSubmitted(event){
    let new_card_name = event.target.parentElement.querySelector(".new-card-name").value;
    let card_id = event.target.parentElement.parentElement.querySelector(".card-id").textContent;
    let card = updateCard(card_id,new_card_name);
    let card_container = document.querySelector(".this-is-the-newest-card").parentElement;
    card_container.querySelector(".card-name").classList.remove("this-is-the-newest-card");
    deleteChildren(card_container.querySelector(".card-name"));
    card_container.querySelector(".card-name").textContent = card.name;
}

async function displayNewCard(event){
    const card= await addMewCard(event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".status-id").textContent);
    let cards_container = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".cards-drop-zone");
    let new_card=`
                    <div class="card-container">
                        <div class="card-id">${card._id}</div>
                        <div class="card-name this-is-the-newest-card"><input class="new-card new-card-name" type="text" value="${card.name}"><a class="new-card submit-button">OK</a></div>
                    </div> 
                    `;
    cards_container.insertAdjacentHTML("beforeend", new_card);
    setEventListenerOnNewCardSubmit();
}

function changeBoardSize(event){
    if( event.target.classList.contains("board-dec-size-icon")){
        event.target.classList.replace("board-dec-size-icon","board-inc-size-icon");
        event.target.parentElement.parentElement.querySelector(".board-content").classList.replace("inc-board-content","dec-board-content");
    }else{
        event.target.classList.replace("board-inc-size-icon","board-dec-size-icon");
        event.target.parentElement.parentElement.querySelector(".board-content").classList.replace("dec-board-content","inc-board-content");
    }

}

let mouseLeaveStatusMenuEvent=null;
function changeStatusMenuDisplay(event){
    let menu = event.target.parentElement.querySelector(".status-menu-container");

    if(menu.classList.contains("hide")){
        menu.classList.replace("hide","display")
        mouseLeaveStatusMenuEvent = event.target.parentElement.parentElement.querySelector(".status-menu");
        mouseLeaveStatusMenuEvent.addEventListener('mouseleave', mouseLeaveStatusMenu);
    }else{
        menu.classList.replace("display","hide")
        mouseLeaveStatusMenuEvent.removeEventListener('mouseleave', mouseLeaveStatusMenu);
        mouseLeaveStatusMenuEvent = null;
    }

}

function mouseLeaveStatusMenu(event){
    if(event.target.querySelector(".status-menu-container").classList.contains("display")){
        event.target.querySelector(".status-menu-container").classList.replace("display","hide");
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
            <div class="board-name"><h1>${board.name}</h1> <div class="board-size-icon board-dec-size-icon"></div></div>
            <div class="board-content inc-board-content">
           `;
            let i=0;
            for(let status of statuses){
                let cards = await getCards(status._id);
                board_list+=`
                <div class="status-container"   style='background-color: ${status_colors[i]}'>
                    <div class="status-id">${status._id}</div>
                    <div class="status-name">
                        <div class="status-menu">
                            <div class="status-menu-icon"></div>
                            <div class="status-menu-container hide">
                                <div class="status-menupoint add-card">Add card</div>
                                <div class="status-menupoint rename-status">Rename status</div>
                                <div class="status-menupoint delete-status">Delete status</div>
                                <div class="status-menupoint change-color">Change color</div>
                            </div>
                        </div>
                    <h1>${status.name}</h1></div>
                    <div class="cards-drop-zone">`;
                for(let card of cards){
                    board_list+=`
                    <div class="card-container"  style='background-color: ${card_colors[i]}'>
                        <div class="card-id">${card._id}</div>
                        <div class="card-name">${card.name}</div>
                    </div> 
                    `;
                }
                board_list+=`
                    </div>
                </div>
                `;
                if(i==2){
                    i=0
                }else{
                    i+=1;
                }
            }
            board_list+=`
        </div>
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