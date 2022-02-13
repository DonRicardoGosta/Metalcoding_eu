import { showErrorMessage, showSystemMessage } from '/static/js/DOM.js';

initIgenyfelmero();

async function initIgenyfelmero(){
    await initPlussButton();
    await setEventListenersOnFields();
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
                showSystemMessage("Successfully renamed");
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
                    showSystemMessage("Successfully renamed");
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