initNav();

function initNav(){
    let nav_icon = document.querySelector("#nav-menu-icon")
    nav_icon.addEventListener('click', navClicked)
}
function navClicked(event){
    let menu = event.target.parentElement.querySelector("#menus")
    let nav = document.querySelector("#nav");
    if(menu.classList.contains("display-nav")){
        menu.classList.replace("display-nav", "hide-nav");
        nav.classList.remove("nav-invade-page");
    }else{
        nav.classList.add("nav-invade-page");
        menu.classList.replace("hide-nav", "display-nav");
    }
    menu.addEventListener('mouseleave', mouseLeftNav)
}
function mouseLeftNav(event){
    let menu = event.target;
    let nav = document.querySelector("#nav");
    if(menu.classList.contains("display-nav")){
        nav.classList.remove("nav-invade-page");
        menu.classList.replace("display-nav", "hide-nav");
    }
}