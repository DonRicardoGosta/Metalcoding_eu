import { getProjects, getBoards } from '/static/js/requests/get_api_requests.js'
import { updateCardName } from '/static/js/requests/put_api_requests.js';
import { writeProjectsToHtml, writeBoardsToHtml, deleteChildren, displayNewCard, refreshCard } from '/static/js/DOM.js';
import { initDragAndDrop } from '/static/js/drag_and_drop.js';


window.onload = initPage


let mouseLeaveStatusMenuEvent=null;
let active_proj;

async function initPage(){
    const projects = await getProjects();
    const boards = await getBoards(projects[0]._id);
    writeProjectsToHtml(projects);
    writeBoardsToHtml(boards);


}

export function setEventListenersOnProjects(){
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
export function setEventListenerOnNewCardSubmit(){
    const submit = document.querySelector(".this-is-the-newest-card");
    submit.querySelector(".submit-button").addEventListener('click',newCardNameSubmitted)
}


async function newCardNameSubmitted(event){
    let new_card_name = event.target.parentElement.querySelector(".new-card-name").value;
    let card_id = event.target.parentElement.parentElement.querySelector(".card-id").textContent;
    let card = await updateCardName(card_id,new_card_name);
    let card_container = document.querySelector(".this-is-the-newest-card").parentElement;
    card_container.querySelector(".card-name").classList.remove("this-is-the-newest-card");
    deleteChildren(card_container.querySelector(".card-name"));
    card_container.querySelector(".card-name").textContent = card.name;
    refreshCard(card_container);
    initDragAndDrop();
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

    const boards = await getBoards(proj_id);
    writeBoardsToHtml(boards)
        .then(setEventListenersOnBoardSizeArrows)
        .then(setEventListenerOnStatusMenus)
        .then(setEventListenerOnAddCard);
}


