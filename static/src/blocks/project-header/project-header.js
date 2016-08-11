(function() {
    angular
        .module('app')
        .directive('spdProjectHeader', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-header/project-header.html",
            controller: ["$scope", "$location", "dataService", controller],
            link: link
        };

        function controller($scope, $location, dataService) {
            $scope.href = $location.absUrl();
            $scope.absPicture = dataService.origin + '/' + $scope.project.project.picture;

        }

        function link() {
        }
    }
})();