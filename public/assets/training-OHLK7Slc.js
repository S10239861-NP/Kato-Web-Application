import"./style-cjHGxzv9.js";import{i as d}from"./components-V92Yn34p.js";d();let l=document.getElementById("cardContainer"),i=document.getElementById("mainContainer"),a=document.getElementById("trainingDetailsContainer"),u=document.getElementById("closeTrainingDetailsButton"),c=document.getElementById("trainingDetailsContainerCourseNameLabel"),m=document.getElementById("trainingDetailsContainerCategoryNameLabel"),g=document.getElementById("trainingDetailsContainerDescriptionLabel"),r=document.querySelector("#sidebar").shadowRoot.querySelector(".sidebar");function b(){c.innerText=this.getAttribute("course-name"),m.innerText=this.getAttribute("category-name"),g.innerText=this.getAttribute("description"),a.classList.add("active"),r.classList.add("fully-hidden"),i.classList.add("invisible")}function C(){let e=new XMLHttpRequest;e.open("POST","/get-trainings",!0),e.onload=s=>{if(e.readyState==XMLHttpRequest.DONE&&e.status==200){let o=JSON.parse(e.responseText);for(const n of o){let t=document.createElement("training-card");t.setAttribute("course-name",n.courseName),t.setAttribute("category-name",n.categoryName),t.setAttribute("duration",n.duration),t.setAttribute("description",n.description),t.addEventListener("mousedown",b.bind(t)),l.appendChild(t)}}},e.onerror=s=>{console.error(e.statusText)},e.send()}addEventListener("resize",e=>{});C();u.addEventListener("mousedown",e=>{a.classList.remove("active"),r.classList.remove("fully-hidden"),i.classList.remove("invisible")});