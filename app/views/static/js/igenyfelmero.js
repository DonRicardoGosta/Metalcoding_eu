import { showErrorMessage, showSystemMessage } from '/static/js/DOM.js';
import {  updateLineRecordName } from "/static/js/requests/put_api_requests.js";
import { getLocations } from "/static/js/requests/get_api_requests.js";

initIgenyfelmero();

async function initIgenyfelmero(){
    await initPlussButton();
    await setEventListenersOnFields();
    await setEventListenersOnLocations();
    const locations = await getLocations();
    for (let location of locations){
        console.log(location)
    }
}
function setEventListenersOnLocations(){
    let location_fields = document.querySelectorAll(".ifl-location-name");
    for (let location_field of location_fields){
        location_field.addEventListener('click', showLocations)
    }
}
async function showLocations(event){
    const locations = await getLocations();
    try{
        let scrollDownMenu =`<select name = "locations-dropdown-options">`;
        for (let location of locations){
            scrollDownMenu+=`<option value = "${ location._id }">${ location.name }</option>`;
        }
        scrollDownMenu+=`</select>`;
        event.target.textContent="";
        event.target.insertAdjacentHTML("beforeend", scrollDownMenu);
    }catch (ex){
        showErrorMessage(ex.message);
    }
}


function setEventListenersOnFields(){
    let name_fields = document.querySelectorAll(".ifl-name");
    for (let name_field of name_fields){
        name_field.addEventListener('dblclick', insertInputField)
    }
}

function insertInputField(event){
    try {
        let origin_text= event.target.textContent;
        let renamebale_text = `
        <input id="ifl-renameable-field" type="text" value="${origin_text}">
        `;
        event.target.textContent="";
        event.target.insertAdjacentHTML("beforeend", renamebale_text);
    }catch (ex){
        showErrorMessage(ex.message);
    }finally {
        const inp_field = document.querySelector("#ifl-renameable-field");
        setEventListenerOnInputField();
    }
}

function setEventListenerOnInputField(){
    if(document.querySelector("#ifl-renameable-field")){
        const inp_field = document.querySelector("#ifl-renameable-field");
        inp_field.addEventListener("keyup", function(event) {

            // Number 13 is the "Enter" key on the keyboard
            if (event.keyCode === 13) {
                let text = inp_field.value;
                let parent= inp_field.parentElement;
                inp_field.remove();
                parent.textContent = text;
                let line_record_id = parent.parentElement.querySelector(".ifl-id").textContent
                updateLineRecordName(line_record_id, text);
                showSystemMessage("Name successfully saved");
            }


        });
        document.addEventListener('click', function(event) {
            if(document.querySelector("#ifl-renameable-field")){

                let isClickInsideElement = inp_field.contains(event.target);
                if (!isClickInsideElement) {
                    let text = inp_field.value;
                    let parent= inp_field.parentElement;
                    inp_field.remove();
                    parent.textContent = text;
                    let line_record_id = parent.parentElement.querySelector(".ifl-id").textContent
                    updateLineRecordName(line_record_id, text);
                    showSystemMessage("Name successfully saved");
                }


            }
        });
    }

}

function initPlussButton(){
    let searchContainer = document.querySelector("#igenyfelmero-container");
    if(searchContainer){
        printPlussButtonToTheScreen(searchContainer);
    }
}

function printPlussButtonToTheScreen(container){
    let button = `
                <div id="add-new-line-button">
                    +
                </div>
    `;
    container.insertAdjacentHTML("beforeend", button);
}