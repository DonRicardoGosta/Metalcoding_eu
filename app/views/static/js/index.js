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

function projectChose(event){
    const proj_id = event.target.parentElement.parentElement.querySelector(".project-id").textContent;
    //console.log(proj_id);
    if(proj_id) removeEventListenersFromProjects();
    getBoards(proj_id);
}

function removeEventListenersFromProjects(){
    const projects = document.querySelectorAll(".project-container");
    for(let proj of projects){
        proj.removeEventListener('click', projectChose);
    }
}



function writeProjectsToHtml(projects){
    const proj_container = document.querySelector("#disp-container");
    if(!proj_container) return console.log("Error: '#disp-container' has not found on the page, please check");
    if(proj_container.firstChild) deleteChildren(proj_container);
    if(projects.length == 0) return emptyListMessage(proj_container);


    let proj_list="";
    for(let proj of projects){
        proj_list+=`
        <div class="project-container">
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
                    <div class="status-name"><h1>${status.name}</h1></div>`;
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
                `;
            }
            board_list+=`
        </div>
    `;
    }
    board_container.insertAdjacentHTML("beforeend", board_list);
}

function deleteChildren(container){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
}
function emptyListMessage(container){
    container.insertAdjacentHTML("beforeend", "No records found");
}