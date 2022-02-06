initIgenyfelmero();

function initIgenyfelmero(){
    let searchContainer = document.querySelector("#igenyfelmero-container");
    if(searchContainer){
        printPlussButtonToTheScreen(searchContainer);
    }
}

function printPlussButtonToTheScreen(container){
    let button = `
                <div class="add-new-line-button">
                    +
                </div>
    `;
    container.insertAdjacentHTML("beforeend", button);
}