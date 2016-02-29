(function(){
    var app = angular.module("getVotes", []);
    app.controller("VoteOptionController", ["$scope", "$http", ($scope, $http) => {
        $scope.chartOptions = [];
        $http({
            method: "GET",
            url: "/api/poll/existing" //TODO - change this to poll searched for
        }).then(function (response) {
            console.log(response);

            $scope.chartOptions = response.data.labels;

        }, function (err) {
            throw err;
        });
    }]);
})();