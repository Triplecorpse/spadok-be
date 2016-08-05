(function() {
    angular.module('app').directive('spdProjectsHeader', [function about () {

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