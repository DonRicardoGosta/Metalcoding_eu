import { refreshCard } from '/static/js/DOM.js';
import { showErrorMessage } from '/static/js/DOM.js';
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
export async function updateLineRecordLocation(line_record_id,option_id){
    let url=`/api/igenyfelmeres/change-option-line-record/${line_record_id}/${option_id}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordFunction(line_record_id,function_id){
    let url=`/api/igenyfelmeres/change-fucntion-line-record/${line_record_id}/${function_id}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordDevice(line_record_id,device_id){
    let url=`/api/igenyfelmeres/change-device-line-record/${line_record_id}/${device_id}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}
export async function updateLineRecordBrand(line_record_id,brand_id){
    let url=`/api/igenyfelmeres/change-brand-line-record/${line_record_id}/${brand_id}`;
    let response = await fetch(url,{
        method:'PUT'
    });
    let data = await response.json();
    return data;
}