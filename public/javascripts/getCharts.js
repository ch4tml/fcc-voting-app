(function(){
    var app = angular.module("allCharts", {});
    app.controller("ChartController", ["$scope", "$http", ($scope, $http) => {
        $scope.charts = [];
        $http({
            method: "GET",
            url: "/api/getAll"
        }).then(function (response) {
            response.forEach((item) => {
                let temp = {};
                temp.polls.poll.title;
                $scope.charts.push(temp);
            });
        }, function (err) {
            throw err;
        });
    }]);
})();