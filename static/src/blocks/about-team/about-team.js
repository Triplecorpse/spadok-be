(function() {
    angular
        .module('app')
        .directive('spdAboutTeam', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/about-team/about-team.html",
            controller: ['$scope', 'dataService', controller]
        };

        function controller($scope, dataService) {
            $scope.team = dataService.team;
        }
    }
})();