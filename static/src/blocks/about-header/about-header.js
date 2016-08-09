(function() {
    angular
        .module('app')
        .directive('spdAbout', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/about/about.html"
        };
    }
})();