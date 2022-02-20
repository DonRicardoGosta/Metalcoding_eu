import {showErrorMessage, showSystemMessage} from '/static/js/DOM.js';

export async function deleteCardById(card_id){
    let url="/api/projects/card/"+card_id;
    await fetch(url,{
        method:'DELETE'
    });
}
export async function deleteCardsByStatusId(status_id){
    let url="/api/projects/card/status-id/"+status_id;
    await fetch(url,{
        method:'DELETE'
    });
}
export async function deleteStatusById(status_id){
    deleteCardsByStatusId(status_id);
    let url="/api/projects/status/"+status_id;
    await fetch(url,{
        method:'DELETE'
    });
}
export async function deleteLineRecord(line_rec_id){
    let url="/api/igenyfelmeres/delete-line/"+line_rec_id;
    let response = await fetch(url,{
        method:'DELETE'
    });
    let data = await response.json();
    if(data.success){
        showSystemMessage("Line has been deleted");
        return "true";
    }else{
        showErrorMessage("Something went wrong, Line has not been deleted");
        return "false"
    }
}