import { initEventListeners } from '/static/js/event_listeners.js';

window.onload = initPage

function initPage(){
    const initAvailable = baseMaterialsExists();
    if (initAvailable){
        initEventListeners();
    }else {
        console.log("Page missing base materials in document, please contact us here: \nhorvath.dani.job@gmail.com");
    }
}
function baseMaterialsExists(){
    if(checkProjectsExists() && checkBoardsExists() && checkStatusesExists() && checkCardsExists() && checkNavExists() && checkFooterExists() && checkErrorMessageBoxExists()){
        return true;
    }else{
        return false;
    }
}
function checkErrorMessageBoxExists(){
    return document.querySelector("#error-message-container")?true:false;
}
function checkNavExists(){
    return document.querySelector("#nav")?true:false;
}
function checkFooterExists(){
    return document.querySelector("#footer")?true:false;
}
function checkProjectsExists(){
    return document.querySelector("#project-panel").querySelector(".project-container")?true:false;
}
function checkBoardsExists(){
    return document.querySelector("#disp-container").querySelector(".board-container")?true:false;
}
function checkStatusesExists(){
    return document.querySelector(".board-content").querySelector(".status-container")?true:false;
}
function checkCardsExists(){
    return document.querySelector(".cards-drop-zone").querySelector(".card-container") ?true:false;
}