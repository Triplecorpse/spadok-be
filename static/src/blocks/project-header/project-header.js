(function() {
    angular
        .module('app')
        .directive('spdProjectHeader', ["dataService", function (dataService) {

            return {
                restrict: "E",
                templateUrl: "./blocks/project-header/project-header.html",
                controller: ["$scope", "$location", controller],
                link: link
            };

            function controller($scope, $location) {
                $scope.href = $location.absUrl();
            }

            function link(scope) {
                scope.absPicture = dataService.origin + '/' + scope.project.project.picture;
            }
        }]);
})();