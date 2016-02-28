(function(){
    var app = angular.module("getVotes", []);
    app.controller("VoteOptionController", ["$scope", "$http", ($scope, $http) => {
        $scope.chartOptions = [];
        $http({
            method: "GET",
            url: "/api/recent" //TODO - change this to poll searched for
        }).then(function (response) {

            $scope.chartOptions = response.data.labels;

        }, function (err) {
            throw err;
        });
    }]);
})();