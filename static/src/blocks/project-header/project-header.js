(function() {
    angular
        .module('app')
        .directive('spdProjectHeader', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/project-header/project-header.html",
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {
        }
        function link() {
        }
    }
})();