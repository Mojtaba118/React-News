export const onSideBarItemChanged=()=>{
    const hamburger = document.querySelector(".hamburger");
    const links = document.querySelectorAll(".menu .menu-item");
    const headers = document.querySelectorAll(".header-item");
    hamburger.addEventListener("click", function () {
        document.querySelector(".sideBar").classList.toggle("sideBar-collapse");
    });
    links.forEach(link => {
        link.addEventListener("click", function () {
            const activeLink = document.querySelector(".menu .activeItem");
            if (activeLink)
                activeLink.classList.remove("activeItem");
            this.classList.add("activeItem");
        });
    });
    headers.forEach(header => {
        header.addEventListener("click", function () {
            const activeHeader = document.querySelector(".header-item.activeHeader");
            if (activeHeader)
                activeHeader.classList.remove("activeHeader");
            this.classList.add("activeHeader");
        });
    });
}

export const switchToDarkMode=()=>{
    const themeSwitch=document.querySelector("#theme");
    if (themeSwitch){
        themeSwitch.addEventListener("change",function (e) {
            const html=document.documentElement;
            html.classList.add("transition");
            if (this.checked){
                html.classList.add("dark");
            }else{
                html.classList.remove("dark");
            }
            setTimeout(function () {
                html.classList.remove("transition");
            },500);
        });
    }
};
