import { showErrorMessage, showSystemMessage } from '/static/js/DOM.js';
import {  updateLineRecordName, updateLineRecordDescription, updateLineRecordLocation, updateLineRecordFunction, updateLineRecordDevice, updateLineRecordBrand, updateLineRecordPiece } from "/static/js/requests/put_api_requests.js";
import {  getDevicePrice, getNewLineRecord, getNumOfPieces } from "/static/js/requests/get_api_requests.js";

initIgenyfelmero();
let totalPrice;
let started=false;

async function initIgenyfelmero(){
    await initPlussButton();
    await setEventListenersOnNameFields();
    await setEventListenersOnDescriptionFields();
    await setEventListenersOnLocations();
    await setEventListenersOnFunctions();
    await setEventListenersOnDevices();
    await setEventListenersOnBrands();
    await getDevicePrices();
    await setEventListenerOnAddNewLineButton();
    await setEventListenerOnPieceButtons();
}
function setEventListenerOnPieceButtons(){
    let piecesDiv = document.querySelectorAll(".piece-actions");
    for (let pieceDiv of piecesDiv){
        pieceDiv.querySelector(".piece-up").addEventListener("click",increasePiece);
        pieceDiv.querySelector(".piece-down").addEventListener("click",decreasePiece);
    }
}
async function increasePiece(event) {
    const line_record_id = event.target.parentElement.parentElement.parentElement.querySelector(".ifl-id").textContent;
    let piece= await updateLineRecordPiece(line_record_id,"inc");
    event.target.parentElement.parentElement.querySelector(".pieces").textContent=piece;
    await getDevicePrices();
}
async function decreasePiece(event) {
    const line_record_id = event.target.parentElement.parentElement.parentElement.querySelector(".ifl-id").textContent;
    let piece= await updateLineRecordPiece(line_record_id,"dec",event);
    event.target.parentElement.parentElement.querySelector(".pieces").textContent=piece;
    await getDevicePrices();
}
function setEventListenerOnAddNewLineButton(){
    let addButtonContainer = document.querySelector("#add-new-line-button");
    addButtonContainer.addEventListener('click',addNewLine);
}
async function addNewLine() {
    const igenyfelmeres_record_id= document.querySelector("#igenyfelmero-record-id").textContent;
    await getNewLineRecord(igenyfelmeres_record_id);
}
async function getDevicePrices() {
    let devicesOptions = document.querySelectorAll("#device-options");

    for(let deviceoptions of devicesOptions){
        for(let device of deviceoptions){
            if(device.selected){
                await getPrice(device.value, device, true)
            }

        }
    }
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
    await getPrice(device_id, event);
}
async function getPrice(device_id, event, isInit){
    let new_price = 0;
    let old_price=0;
    try{
        let device = await getDevicePrice(device_id);
        let device_location;
        if(isInit){
            device_location = event.parentElement;
        }else{
            device_location = event.target;
        }
        old_price = device_location.parentElement.parentElement.querySelector(".ifl-price").textContent;
        if(!device.error) {
            let line_id=device_location.parentElement.parentElement.querySelector(".ifl-id").textContent;
            let piece = await getNumOfPieces(line_id);
            device_location.parentElement.parentElement.querySelector(".ifl-price").textContent = (device[0].price*piece);
            new_price+=(device[0].price*piece);
        }else{
            device_location.parentElement.parentElement.querySelector(".ifl-price").textContent= "0";
        }
    }catch (ex){
        showErrorMessage(ex.message);
    }finally{

        if(started){
            totalPrice+=new_price;
            totalPrice-=old_price;
        }else{
            totalPrice=0;
            started=true;
            totalPrice+=new_price;
            totalPrice-=old_price;
        }
    }
    printTotalPriceToTheScreen();
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

function printTotalPriceToTheScreen(){
    let searchContainer = document.querySelector("#total-price");
    searchContainer.textContent=totalPrice+" Ft";
}