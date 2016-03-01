(function(){
    var app = angular.module("getVotes", []);
    app.controller("VoteOptionController", ["$scope", "$http", "$location", ($scope, $http, $location) => {
        $scope.chartOptions = [];
        $scope.title;
        $scope.clickCount = 0;
        // Data object required for Chart JS
        $scope.datasource = {
            labels: [],
            datasets: []
        };
        
        var path = $location.absUrl();
        path = path.split("").reverse().join("").substring(0, 9).split("").reverse().join("");
        
        $http({
            method: "GET",
            url: "/api" + path, //TODO - change this to poll searched for
        }).then(function (response) {
            $scope.chartOptions = response.data.labels;
            $scope.title = response.data.title;
            $scope.datasource.labels = response.data.labels;
            $scope.datasource.datasets.push(response.data.dataset["0"]);
            
            var ctx = document.getElementById("myChart").getContext("2d");
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

            myBarChart = new Chart(ctx).Bar($scope.datasource, opts);
        }, function (err) {
            throw err;
        });
        
        // Experimenting with add vote
        //$scope.addVote = () => $scope.datasource.datasets["0"].data[0]++;
        $scope.addVote = (name) => {
            if($scope.chartOptions.indexOf(name) < 0)
                return;
            else{
                var x = $scope.chartOptions.indexOf(name);
                console.log(x);
                console.log($scope.datasource.datasets["0"].data[x]);
                $scope.datasource.datasets["0"].data[x]++;
                console.log($scope.datasource.datasets["0"].data[x]);
            }
        }
        //$scope.addVote = () => $scope.clickCount++;

    }]);
})();