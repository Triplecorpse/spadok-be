(function() {
    angular.module('app').directive('spdProjectsHeader', [function() {

        return {
            restrict: "E",
            templateUrl: "./blocks/projects-header/projects-header.html",
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {
        }
        function link() {
        }
    }]);
})();