import { showErrorMessage, showSystemMessage } from '/static/js/DOM.js';
import {  updateLineRecordName, updateLineRecordDescription, updateLineRecordLocation, updateLineRecordFunction, updateLineRecordDevice, updateLineRecordBrand } from "/static/js/requests/put_api_requests.js";
import {  getDevicePrice } from "/static/js/requests/get_api_requests.js";

initIgenyfelmero();

async function initIgenyfelmero(){
    await initPlussButton();
    await setEventListenersOnNameFields();
    await setEventListenersOnDescriptionFields();
    await setEventListenersOnLocations();
    await setEventListenersOnFunctions();
    await setEventListenersOnDevices();
    await setEventListenersOnBrands();
}
function setEventListenersOnBrands(){
    let brandOptions = document.querySelectorAll("#brand-options");

    for(let option of brandOptions){
        option.addEventListener("change", brandChoosed, false);
    }
}
function setEventListenersOnDevices(){
    let deviceOptions = document.querySelectorAll("#device-options");

    for(let option of deviceOptions){
        option.addEventListener("change", deviceChoosed, false);
    }
}
function setEventListenersOnFunctions(){
    let functionOptions = document.querySelectorAll("#function-options");

    for(let option of functionOptions){
        option.addEventListener("change", functionChoosed, false);
    }
}

function setEventListenersOnLocations(){
    let locationOptions = document.querySelectorAll("#location-options");

    for(let option of locationOptions){
        option.addEventListener("change", optionChoosed, false);
    }
}
async function functionChoosed(event){
    let function_id=event.target.value;
    let line_record_id=event.target.parentElement.parentElement.querySelector(".ifl-id").textContent
    await updateLineRecordFunction(line_record_id, function_id);
    showSystemMessage("Function saved successfully");
}
async function deviceChoosed(event){
    let device_id=event.target.value;
    let line_record_id=event.target.parentElement.parentElement.querySelector(".ifl-id").textContent
    await updateLineRecordDevice(line_record_id, device_id);
    showSystemMessage("Device saved successfully");
    await getPrice(device_id);
}
async function getPrice(device_id){
    let device = await getDevicePrice(device_id);
    console.log(device[0].price);
}
async function brandChoosed(event){
    let brand_id=event.target.value;
    let line_record_id=event.target.parentElement.parentElement.querySelector(".ifl-id").textContent
    await updateLineRecordBrand(line_record_id, brand_id);
    showSystemMessage("Location saved successfully");
}
async function optionChoosed(event){
    let option_id=event.target.value;
    let line_record_id=event.target.parentElement.parentElement.querySelector(".ifl-id").textContent
    await updateLineRecordLocation(line_record_id, option_id);
    showSystemMessage("Location saved successfully");
}
function setEventListenersOnDescriptionFields(){
    let description_fields = document.querySelectorAll(".ifl-description");
    for (let description_field of description_fields){
        description_field.addEventListener('dblclick', insertInputFieldToDescription)
    }
}
function setEventListenersOnNameFields(){
    let name_fields = document.querySelectorAll(".ifl-name");
    for (let name_field of name_fields){
        name_field.addEventListener('dblclick', insertInputFieldToName)
    }
}

function insertInputFieldToDescription(event){
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
        setEventListenerOnDescriptionInputField();
    }
}
function insertInputFieldToName(event){
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
        setEventListenerOnNameInputField();
    }
}
function setEventListenerOnDescriptionInputField(){
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
                updateLineRecordDescription(line_record_id, text);
                showSystemMessage("Description successfully saved");
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
                    updateLineRecordDescription(line_record_id, text);
                    showSystemMessage("Description successfully saved");
                }


            }
        });
    }

}


function setEventListenerOnNameInputField(){
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