const status_colors = ["rgba(120, 204, 141,1)","rgba(255, 215, 128, 1)","rgba(145, 207, 255, 1)"];
const card_colors = ["rgba(0,100,0,1)","rgba(255, 136, 0, 1)","rgba(14, 82, 171, 1)"];

export function cardSchema(card){
    return`
                    <div class="card-container">
                        <div class="card-id">${card._id}</div>
                        <div class="card-menu">
                            <div class="card-menu-icon"></div>
                            <div class="card-menu-container hide">
                                <div class="card-menupoint rename-card">Rename card</div>
                                <div class="card-menupoint delete-card">Delete card</div>
                            </div>
                        </div>
                        <div class="card-name">${card.name}</div>
                    </div> 
                    `;

}
export function renameCardSchema(card){
    return`
                    <div class="card-container">
                        <div class="card-id">${card._id}</div>
                        <div class="card-name this-is-the-newest-card"><input class="new-card new-card-name" type="text" value="${card.name}"><a class="new-card submit-button">OK</a></div>
                    </div> 
                    `;
}
export function renameCardSchema_poor(card){
    return`
                        <div class="card-id">${card._id}</div>
                        <div class="card-name this-is-the-newest-card"><input class="new-card new-card-name" type="text" value="${card.name}"><a class="new-card submit-button">OK</a></div>         
                    `;
}

export function statusSchema(status, i){
    return`
                <div class="status-container"   style='background-color: ${status_colors[i]}'>
                    <div class="status-id">${status._id}</div>
                    <div class="status-card-color">${card_colors[i]}</div>
                    <div class="status-name">
                        <div class="status-menu">
                            <div class="status-menu-icon"></div>
                            <div class="status-menu-container hide">
                                <div class="status-menupoint add-card">Add card</div>
                                <div class="status-menupoint rename-status">Rename status</div>
                                <div class="status-menupoint delete-status">Delete status</div>
                                <div class="status-menupoint change-color">Change color</div>
                            </div>
                        </div>
                    <h1>${status.name}</h1></div>
                    <div class="cards-drop-zone">
                    </div>
                </div>
                `;
}
export function boardSchema(board){
    return`
        <div class="board-container">
            <div class="board-id">${board._id}</div>
            <div class="project-id">${board.project_id}</div>
            <div class="board-created-user"><p>Created user: ${board.created_user.name}</p></div>
            <div class="board-name"><h1>${board.name}</h1> <div class="board-size-icon board-dec-size-icon"></div></div>
            <div class="board-content inc-board-content"></div>
        </div>
    `;

}
export function errorMessageSchema(errorMSG){
    return`
        <div class="error-message-box">
            <div class="message-box-header">
                <div class="message-box-close-icon"></div>
            </div>
            <div class="message-box-body">
                <p>${ errorMSG }</p>
            </div>
        </div>
    `;

}