import * as utils from "./libs/utils.js";

import * as components from "./libs/components.js";

components.init();

function drawChartForTrainingRemainingOverTime()
{
    let data = google.visualization.arrayToDataTable(
        [
            ["Training", "left"],
            ["A", 1],
            ["B", 4],
            ["C", 2],
            ["D", 3],
        ]
    );

    let options = {
        is3D: true,
        width: "100%",
        height: "100%",
        legend: {
            position: "bottom"
        },
    };

    let chartElement = document.getElementById("piechart_3d");

    let chart = new google.visualization.PieChart(
        chartElement
    );
    
    chart.draw(data, options);
}

function drawChartForTasksRemainingOverTime()
{
    let data = google.visualization.arrayToDataTable(
        [
            ["Date", "Incomplete", "Complete"],
            ["29Jan", 10, 4],
            ["30Jan", 11, 4],
            ["31Jan", 6, 9],
            ["1Feb", 3, 12],
        ]
    );
    
    let options = {
        curveType: "function",
        legend: {
            position: "bottom" 
        },
        width: "100%",
        height: "100%",
    };

    let chartElement = document.getElementById("curve_chart");
    
    let chart = new google.visualization.LineChart(
        chartElement
    );
    
    chart.draw(data, options);
}

/**
 * Warning: Do not use this function, it does not work as intended.
 * @param {HTMLDivElement} chartElement 
 */
function makeChartResponsive(chartElement)
{
    let chartParentElement = chartElement.parentElement;

    window.addEventListener("resize", (uiEvent) =>
    {
        let chartParentElementComputedStyle = getComputedStyle(chartParentElement);

        let availableWidth = utils.getActualWidthOfElement(
            chartParentElement
        );

        let availableHeight = utils.getActualHeightOfElement(
            chartParentElement
        );

        for (const chartSiblingElement of chartParentElement.children)
        {
            if (chartSiblingElement.isEqualNode(chartSiblingElement) == true)
            {
                continue;
            }
            
            availableWidth -= utils.getActualWidthOfElement(
                chartSiblingElement
            );
    
            availableHeight -= utils.getActualHeightOfElement(
                chartSiblingElement
            );
        }

        chartElement.style.width = `${availableWidth}px`;

        chartElement.style.height = `${availableHeight}px`;
    });
}

google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(
    drawChartForTrainingRemainingOverTime
);

google.charts.setOnLoadCallback(
    drawChartForTasksRemainingOverTime
);
