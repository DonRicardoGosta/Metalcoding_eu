import {showErrorMessage} from '/static/js/DOM.js';

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