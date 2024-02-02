let menuBtn = document.querySelector("#menu_btn");

let sidebar = document.querySelector(".sidebar");

menuBtn.onclick = function() {
    sidebar.classList.toggle("active");
};