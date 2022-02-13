import { errorMessageSchema, systemMessageSchema, renameCardSchema, cardSchema, renameCardSchema_poor } from '/static/js/DOM_schemas.js';
import { takeEventListenerOnCloseErrorMessages, setEventListenerOnNewCardSubmit, mouseLeaveStatusMenu, mouseLeaveCardMenu } from "/static/js/event_listeners.js";
import { addMewCard } from "/static/js/requests/post_api_requests.js";
import { getCard } from "/static/js/requests/get_api_requests.js";
import { deleteCardById, deleteStatusById } from "/static/js/requests/delete_api_requests.js";




export function showErrorMessage(errorMSG){
    const errorMsgContainer = document.querySelector("#error-message-container");
    const message = errorMessageSchema(errorMSG);
    errorMsgContainer.insertAdjacentHTML("beforeend", message);
    takeEventListenerOnCloseErrorMessages();
}
export function showSystemMessage(systemMSG){
    const systemMsgContainer = document.querySelector("#error-message-container");
    const message = systemMessageSchema(systemMSG);
    systemMsgContainer.insertAdjacentHTML("beforeend", message);
    takeEventListenerOnCloseErrorMessages(message);
}
export function deleteErrorMessage(event){
    const error_msg = event.target.parentElement.parentElement;
    error_msg.remove();
}
export function deleteSystemMessage(systemMSG){
    systemMSG.target.remove();
}
export function changeBoardSize(event){
    try {
        if( event.target.classList.contains("board-dec-size-icon")){
            event.target.classList.replace("board-dec-size-icon","board-inc-size-icon");
            event.target.parentElement.parentElement.querySelector(".board-content").classList.replace("inc-board-content","dec-board-content");
        }else{
            event.target.classList.replace("board-inc-size-icon","board-dec-size-icon");
            event.target.parentElement.parentElement.querySelector(".board-content").classList.replace("dec-board-content","inc-board-content");
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }


}
export async function displayNewCard(event){
    try {
        const card= await addMewCard(event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".status-id").textContent);
        let cards_container = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".cards-drop-zone");
        let new_card = renameCardSchema(card);
        cards_container.insertAdjacentHTML("beforeend", new_card);
        setEventListenerOnNewCardSubmit();
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
export function deleteStatus(event){
    try{
        const status_id = event.target.parentElement.parentElement.parentElement.parentElement.querySelector(".status-id").textContent;
        deleteStatusById(status_id);
        event.target.parentElement.parentElement.parentElement.parentElement.remove();

    }catch (ex){
        showErrorMessage(ex.message);
    }
}
export function deleteCard(event){
    try {
        const card_id = event.target.parentElement.parentElement.parentElement.querySelector(".card-id").textContent;
        deleteCardById(card_id);
        event.target.parentElement.parentElement.parentElement.remove();
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
export async function renameCard(event){
    try {
        const card_id = event.target.parentElement.parentElement.parentElement.querySelector(".card-id").textContent;
        const card = await getCard(card_id);
        let rename_able_card = renameCardSchema_poor(card[0]);
        let container = event.target.parentElement.parentElement.parentElement;
        deleteChildren(container);
        container.insertAdjacentHTML("beforeend", rename_able_card);
        setEventListenerOnNewCardSubmit();
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
export async function refreshCard(card){
    let card_color = card.parentElement.parentElement.querySelector(".status-card-color").textContent;
    card.style.backgroundColor = card_color;
}
export function deleteChildren(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
export function writeCardToHtml(card, container){
    let card_schema = cardSchema(card);
    container.insertAdjacentHTML("beforeend", card_schema);
}
let mouseLeaveCardMenuEvent=null;
export function changeCardsMenuDisplay(event){
    try {
        let menu = event.target.parentElement.querySelector(".card-menu-container");
        if(menu.classList.contains("hide")){
            menu.classList.replace("hide","display");
            mouseLeaveCardMenuEvent = event.target.parentElement.parentElement.querySelector(".card-menu");
            mouseLeaveCardMenuEvent.addEventListener('mouseleave', mouseLeaveCardMenu);
        }else{
            menu.classList.replace("display","hide");
            mouseLeaveStatusMenuEvent.removeEventListener('mouseleave', mouseLeaveCardMenu);
            mouseLeaveStatusMenuEvent = null;
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }
}
let mouseLeaveStatusMenuEvent=null;
export function changeStatusMenuDisplay(event){
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
/*export function writeProjectsToHtml(projects){
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
    setEventListenersOnProjects();
    document.querySelector(".project-container").click(); //click on the first project
}
export async function writeBoardsToHtml(boards){
    const board_container = document.querySelector("#disp-container");
    if(!board_container) return console.log("Error: '#disp-container' has not found on the page, please check");
    if(board_container.firstChild) deleteChildren(board_container);
    if(boards.length == 0) return emptyListMessage(board_container);


    let board_list="";
    let board_ids=[];
    for(let board of boards){
        board_ids.push(board._id);
        board_list+= await boardSchema(board)
    }
    board_container.insertAdjacentHTML("beforeend", board_list);
    await writeStatusesToHtml(board_ids);
    initDragAndDrop();
}
export async function writeStatusesToHtml(board_ids){
    let status_ids=[];
    let status_list="";
    for(let board_id of board_ids){
        let status_containers=document.querySelectorAll(".board-id")
        for(let status_container of status_containers){
            if(status_container.textContent == board_id){
                status_container = status_container.parentElement.querySelector(".board-content");
                if(status_container.firstChild) deleteChildren(status_containers);
                let statuses = await getStatuses(board_id);
                let index=0;
                for(let status of statuses){
                    status_ids.push(status._id);
                    status_list+= statusSchema(status, index);
                    if(index==2){
                        index=0;
                    }else{
                        index++;
                    }
                }
                if(status_list!="")status_container.insertAdjacentHTML("beforeend", status_list);

            }
            status_list="";
        }

    }
    await writeCardsToHtml(status_ids);

}
async function writeCardsToHtml(status_ids){
    let index=0;
    let card_list="";
    let statuses = document.querySelectorAll(".status-id");
    for(let status of statuses){

        for(let status_id of status_ids){
            if(status.textContent == status_id){
                status = status.parentElement.querySelector(".cards-drop-zone")
                if(status.firstChild) deleteChildren(status);
                let cards = await getCards(status_id);

                for(let card of cards){
                    card_list+= cardSchema(card, index);
                }
                if(card_list!="")status.insertAdjacentHTML("beforeend", card_list);
            }
            card_list="";
        }
        if(index==2){
            index=0;
        }else{
            index++;
        }
    }
}
/*async function refreshProject(project_id){
    if(!project_id){
        let projects = await getProjects();
        await writeProjectsToHtml(projects);
    }else{
        let project = await getProject(project_id);
        await writeProjectToHtml(project);
    }
}
async function refreshBoard(board_id){
    if(!board_id){
        let boards = await getBoards();
        await writeBoardsToHtml(boards);
    }else{
        let board = await getBoard(board_id);
        await writeBoardToHtml(board);
    }
}
async function refreshStatus(status_id){
    if(!status_id){
        let statuses = await getStatuses();
        await writeStatusesToHtml(statuses);
    }else{
        let status = await getStatus(status_id);
        await writeStatusToHtml(status);
    }
}

function emptyListMessage(container){
    container.insertAdjacentHTML("beforeend", "No records found");
}*/