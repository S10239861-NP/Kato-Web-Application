import"./style-6XPtJ8iy.js";import{w as l}from"./utils-kMfNOAL2.js";import{i as s}from"./components-qM83PsYa.js";let d=document.querySelector("#trainingModuleCardsContainer"),o=[];function g(){let e=[["Remaining lessons","Percentage"]];for(const r of o)e.push([r.Name,1]);let t=google.visualization.arrayToDataTable(e),a={is3D:!0,width:"100%",height:"100%",legend:{position:"bottom"}},n=document.getElementById("piechart_3d"),i=new google.visualization.PieChart(n);i.draw(t,a),window.addEventListener("resize",r=>{i.draw(t,a)})}function u(){let e=google.visualization.arrayToDataTable([["Date","Incomplete","Complete"],["29Jan",10,4],["30Jan",11,4],["31Jan",6,9],["1Feb",3,12]]),t={curveType:"function",legend:{position:"bottom"},width:"100%",height:"100%"},a=document.getElementById("curve_chart"),n=new google.visualization.LineChart(a);n.draw(e,t),window.addEventListener("resize",i=>{n.draw(e,t)})}async function c(){let e=new XMLHttpRequest;return e.open("POST","/get-all-training-modules"),e.send(),await l(e),JSON.parse(e.responseText)}async function m(){for(const e of o){let t=document.createElement("training-module-card");t.setAttribute("name",e.Name),d.appendChild(t)}}async function h(){s(),o=await c(),google.charts.load("current",{packages:["corechart"]}),google.charts.setOnLoadCallback(u),google.charts.setOnLoadCallback(g),await m()}h();
