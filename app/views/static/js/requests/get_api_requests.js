//START Project get requests
export async function getProjects(){
    let url="/api/projects/get-projects";
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
export async function getProject(project_id){
    let url="/api/projects/get-project/"+project_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
//END Project get requests
//-------------------------------------------------------------------------
//START Board get requests
export async function getBoards(project_id){
    let url="/api/projects/get-boards/"+project_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
export async function getBoard(board_id){
    let url="/api/projects/get-board/"+board_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
//END Board get requests
//-------------------------------------------------------------------------
//START Status get requests
export async function getStatuses(board_id){
    let url="/api/projects/get-statuses/"+board_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
export async function getStatus(status_id){
    let url="/api/projects/get-status/"+status_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
//END Status get requests
//-------------------------------------------------------------------------
//START Card get requests
export async function getCards(status_id){
    let url="/api/projects/get-cards/"+status_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
export async function getCard(card_id){
    let url="/api/projects/get-cards/"+card_id;
    let response = await fetch(url);
    let data = await response.json();
    return data;
}
//END Card get requests