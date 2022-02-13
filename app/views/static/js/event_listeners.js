import { showErrorMessage, deleteErrorMessage, changeBoardSize, displayNewCard, writeCardToHtml, changeStatusMenuDisplay, changeCardsMenuDisplay, renameCard, deleteCard, deleteStatus } from '/static/js/DOM.js';
import { initDragAndDrop } from '/static/js/drag_and_drop.js';
import { updateCardName } from "/static/js/requests/put_api_requests.js";
import {deleteSystemMessage} from "./DOM";



export function initEventListeners(){
    setEventListenersOnBoardSizeArrows();
    setEventListenersOnStatuses();
    setEventListenersOnCards();
    initDragAndDrop();
}
export function setEventListenersOnStatuses(){
    setEventListenersOnStatusMenu();
    setEventListenerOnAddCardMenuPoint();
    setEventListenerOnDeleteCardMenuPoint();
}
export function setEventListenersOnCards(){
    setEventListenersOnCardsMenu();
    setEventListenersOnRenameCard();
    setEventListenersOnDeleteCard();
}
function setEventListenerOnDeleteCardMenuPoint(){
    try{
        const statuses = document.querySelectorAll(".delete-status");
        for(let status of statuses){
            status.addEventListener('click', deleteStatus)
        }
    }catch (ex) {
        showErrorMessage(ex.message);
    }
}
function setEventListenersOnDeleteCard(){
    try {
        const cards = document.querySelectorAll(".delete-card");
        for(let card of cards){
            card.addEventListener('click', deleteCard)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
function setEventListenersOnRenameCard(){
    try {
        const cards = document.querySelectorAll(".rename-card");
        for(let card of cards){
            card.addEventListener('click', renameCard)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
function setEventListenersOnCardsMenu(){
    try {
        const cards_menus = document.querySelectorAll(".card-menu-icon");
        for(let menu of cards_menus){
            menu.addEventListener('click', changeCardsMenuDisplay)
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
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
        writeCardToHtml(card, card_container.parentElement)
        card_container.remove();
        setEventListenersOnCards();
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
export function mouseLeaveStatusMenu(event){
    try{
        if(event.target.querySelector(".status-menu-container").classList.contains("display")){
            event.target.querySelector(".status-menu-container").classList.replace("display","hide");
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }

}
export function mouseLeaveCardMenu(event){
    try{
        if(event.target.querySelector(".card-menu-container").classList.contains("display")){
            event.target.querySelector(".card-menu-container").classList.replace("display","hide");
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
export function takeEventListenerOnCloseErrorMessages(systemMsg){
    try {
        if(systemMsg){
            setTimeout(
                function() {
                    deleteSystemMessage(systemMsg);
                }, 5000);
        }
        let error_message_boxes = document.querySelectorAll(".error-message-box");
        for(let err_box of error_message_boxes){
            err_box.querySelector(".message-box-close-icon").addEventListener('click', deleteErrorMessage);
        }

    }catch (ex){
        showErrorMessage(ex.message);
    }
}


