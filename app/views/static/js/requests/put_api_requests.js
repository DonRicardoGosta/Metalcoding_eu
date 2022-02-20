import { refreshCard } from '/static/js/DOM.js';
import { showErrorMessage } from '/static/js/DOM.js';
import { deleteLineRecord } from '/static/js/requests/delete_api_requests.js';
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
export async function updateLineRecordPiece(line_record_id,value_dir,event){
    if(value_dir=="inc"){
        let url=`/api/igenyfelmeres/increase-piece/${line_record_id}`;
        let response = await fetch(url,{
            method:'PUT'
        });
        let data = await response.json();
        return data.piece;
    }else if(value_dir=="dec"){
        let url=`/api/igenyfelmeres/decrease-piece/${line_record_id}`;
        let response = await fetch(url,{
            method:'PUT'
        });
        let data = await response.json();
        if(data.piece == -1){

            const save_row = event.target.parentElement.parentElement.parentElement;
            let container = event.target.parentElement.parentElement.parentElement;

            let question = `<div class="delete-line">
                                <p>Do you want to delete this line?</p>
                                <div class="delete-line-button">yes</div>
                                <div class="dont-delete-line-button">no</div>
                            </div>`;
            await container.insertAdjacentHTML("beforeend", question);
            await container.querySelector(".delete-line-button").addEventListener("click", deleteLineRecordEvent);
            await container.querySelector(".dont-delete-line-button").addEventListener("click", dontDeleteLineRecord);
            return 1;
        }else{
            return data.piece;
        }
    }else{
        showErrorMessage("wrong operation");
        return;
    }
}
async function deleteLineRecordEvent(event){
    const line_rec_id= event.target.parentElement.parentElement.querySelector(".ifl-id").textContent;
    let successfully_deleted= await deleteLineRecord(line_rec_id);
    if (successfully_deleted){
        event.target.parentElement.parentElement.remove();
    }else{
        dontDeleteLineRecord(event);
    }
}
function dontDeleteLineRecord(event){
    event.target.parentElement.remove();
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