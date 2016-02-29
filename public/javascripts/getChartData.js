$(document).ready(function(){
    "use strict";
    var ctx = $("#myChart").get(0).getContext("2d");
    var myBarChart;
    var opts = {
                scaleBeginAtZero : true,
                scaleShowGridLines : true,
                scaleGridLineColor : "rgba(0,0,0,.05)",
                scaleGridLineWidth : 1,
                scaleShowHorizontalLines: true,
                scaleShowVerticalLines: true,
                barShowStroke : true,
                barStrokeWidth : 2,
                barValueSpacing : 5,
                barDatasetSpacing : 1,
                legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].fillColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
            };

    function getData(){
        return $.ajax({
            url: "/:path",
            type: "get"
        });
    }
    
    getData().done(function(data) {
        data = JSON.parse(data);
        console.log(data);
        var data = {
            labels          : data.labels,
            datasets        : data.dataset
        };
        myBarChart = new Chart(ctx).Bar(data, opts)
    });
});
