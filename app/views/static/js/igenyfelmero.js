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
    let origin_text= event.target.textContent;
    let renamebale_text = `
        <input id="ifl-renameable-field" type="text" value="${origin_text}">
    `;
    event.target.textContent="";
    event.target.insertAdjacentHTML("beforeend", renamebale_text);
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