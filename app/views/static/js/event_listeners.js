import { showErrorMessage, deleteErrorMessage, changeBoardSize, displayNewCard, deleteChildren, refreshCard } from '/static/js/DOM.js';
import { initDragAndDrop } from '/static/js/drag_and_drop.js';
import { updateCardName } from "/static/js/requests/put_api_requests.js";


let mouseLeaveStatusMenuEvent=null;
export function initEventListeners(){
    setEventListenersOnBoardSizeArrows();
    setEventListenersOnStatusMenu();
    setEventListenerOnAddCardMenuPoint();
    initDragAndDrop();
}
function setEventListenerOnAddCardMenuPoint(){
    try {
        const add_card_menus = document.querySelectorAll(".add-card");
        for(let menu of add_card_menus){
            menu.addEventListener('click', displayNewCard)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
export function setEventListenerOnNewCardSubmit(){
    try{
        const submit = document.querySelector(".this-is-the-newest-card");
        submit.querySelector(".submit-button").addEventListener('click',newCardNameSubmitted)
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
async function newCardNameSubmitted(event){
    try {
        const new_card_name = event.target.parentElement.querySelector(".new-card-name").value;
        const card_id = event.target.parentElement.parentElement.querySelector(".card-id").textContent;
        const card = await updateCardName(card_id,new_card_name);
        let card_container = document.querySelector(".this-is-the-newest-card").parentElement;
        card_container.querySelector(".card-name").classList.remove("this-is-the-newest-card");
        deleteChildren(card_container.querySelector(".card-name"));
        card_container.querySelector(".card-name").textContent = card.name;
        refreshCard(card_container);
        initDragAndDrop();
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
function setEventListenersOnStatusMenu(){
    try {
        const status_menus = document.querySelectorAll(".status-menu-icon");
        for(let menu of status_menus){
            menu.addEventListener('click', changeStatusMenuDisplay)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }

}
function changeStatusMenuDisplay(event){
    try {
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
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
function mouseLeaveStatusMenu(event){
    try{
        if(event.target.querySelector(".status-menu-container").classList.contains("display")){
            event.target.querySelector(".status-menu-container").classList.replace("display","hide");
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }

}
function setEventListenersOnBoardSizeArrows(){
    try{
        const board_size_arrows = document.querySelectorAll(".board-size-icon");
        const boards = document.querySelectorAll(".board-container");
        if(boards.length != board_size_arrows.length) return showErrorMessage("error while initialized board size event listeners");
        for(let board_size of board_size_arrows){
            board_size.addEventListener('click', changeBoardSize)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }

}
export function takeEventListenerOnCloseErrorMessages(){
    try {
        let error_message_boxes = document.querySelectorAll(".error-message-box");
        for(let err_box of error_message_boxes){
            err_box.querySelector(".message-box-close-icon").addEventListener('click', deleteErrorMessage);
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}

