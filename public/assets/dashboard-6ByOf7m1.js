import"./style-hF4nuL6T.js";import{i}from"./components-V92Yn34p.js";i();function n(){let t=google.visualization.arrayToDataTable([["Training","left"],["A",1],["B",4],["C",2],["D",3]]),e={is3D:!0,width:"100%",height:"100%",legend:{position:"bottom"}},a=document.getElementById("piechart_3d");new google.visualization.PieChart(a).draw(t,e)}function r(){let t=google.visualization.arrayToDataTable([["Date","Incomplete","Complete"],["29Jan",10,4],["30Jan",11,4],["31Jan",6,9],["1Feb",3,12]]),e={curveType:"function",legend:{position:"bottom"},width:"100%",height:"100%"},a=document.getElementById("curve_chart");new google.visualization.LineChart(a).draw(t,e)}google.charts.load("current",{packages:["corechart"]});google.charts.setOnLoadCallback(n);google.charts.setOnLoadCallback(r);
