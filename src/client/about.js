import * as components from "./libs/components.js";

import Swiper from "swiper";

components.init();

let swiper = new Swiper(".slide-content",{
    slidesPerView:3,
    spaceBetween:30,
    slidesPerGroup:3,
    loop:true,
    loopFillGroupWithBlank:true,
    pagination:{
        el:".swiper-pagination",
        clickable:true,
    },
    navigation:{
        nextEL:".swiper-button-next",
        prevEl:".swiper-button-prev",
    },
});