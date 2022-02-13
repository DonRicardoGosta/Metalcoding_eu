import { refreshCard } from '/static/js/DOM.js';
import {showErrorMessage} from "../DOM";
export async function initCardPlaceSync(card){
    let card_id = card.querySelector(".card-id").textContent;
    let status_id = card.parentElement.parentElement.querySelector(".status-id").textContent;
    let url=`/api/projects/move-card/${card_id}/${status_id}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = response.json();
    refreshCard(card);
}
export async function updateCardName(card_id,new_name){
    let url=`/api/projects/rename-card/${card_id}/${new_name}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordName(line_record_id,new_name){
    let url=`/api/igenyfelmeres/rename-name-line-record/${line_record_id}/${new_name}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordDescription(line_record_id,new_name){
    let url=`/api/igenyfelmeres/rename-description-line-record/${line_record_id}/${new_name}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordOption(line_record_id,option_id){
    let url=`/api/igenyfelmeres/change-option-line-record/${line_record_id}/${option_id}`;
    showErrorMessage(url);
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}