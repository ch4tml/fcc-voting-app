(function(){
    var app = angular.module("allCharts", []);
    app.controller("ChartController", ["$scope", "$http", ($scope, $http) => {
        $scope.charts = [];
        $http({
            method: "GET",
            url: "/api/all"
        }).then(function (response) {
            console.log(response);
            console.log(typeof(response));

            response.data.forEach((item) => {
                var temp = {};
                temp.title = item.polls.poll.title;
                temp.url = item.polls.poll.url;
                $scope.charts.push(temp);
            });
        }, function (err) {
            throw err;
        });
    }]);
})();