import"./style-f6zJEF08.js";import{i as n}from"./components-8J1iViY9.js";n();function r(){let e=google.visualization.arrayToDataTable([["Training","left"],["A",1],["B",4],["C",2],["D",3]]),t={is3D:!0,width:"100%",height:"100%",legend:{position:"bottom"}},i=document.getElementById("piechart_3d"),a=new google.visualization.PieChart(i);a.draw(e,t),window.addEventListener("resize",o=>{a.draw(e,t)})}function l(){let e=google.visualization.arrayToDataTable([["Date","Incomplete","Complete"],["29Jan",10,4],["30Jan",11,4],["31Jan",6,9],["1Feb",3,12]]),t={curveType:"function",legend:{position:"bottom"},width:"100%",height:"100%"},i=document.getElementById("curve_chart"),a=new google.visualization.LineChart(i);a.draw(e,t),window.addEventListener("resize",o=>{a.draw(e,t)})}google.charts.load("current",{packages:["corechart"]});google.charts.setOnLoadCallback(r);google.charts.setOnLoadCallback(l);
