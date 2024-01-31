let menuBtn = document.querySelector("#menu_btn");

let sidebar = document.querySelector(".sidebar");

let logoutButton = document.getElementById("logout");

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
        title: "Training left",
        is3D: true,
    };

    let chart = new google.visualization.PieChart(
        document.getElementById("piechart_3d")
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
        title: "Tasks over time",
        curveType: "function",
        legend: { position: "bottom" },
    };
    
    let chart = new google.visualization.LineChart(
        document.getElementById("curve_chart")
    );
    
    chart.draw(data, options);
}

menuBtn.onclick = function () {
    sidebar.classList.toggle("active");
};

logoutButton.addEventListener("mousedown", (mouseEvent) => {
    window.location.href = "/";
});

google.charts.load("current", { packages: ["corechart"] });

google.charts.setOnLoadCallback(
    drawChartForTrainingRemainingOverTime
);

google.charts.setOnLoadCallback(
    drawChartForTasksRemainingOverTime
);
