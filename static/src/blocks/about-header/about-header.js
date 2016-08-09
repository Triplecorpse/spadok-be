(function() {
    angular
        .module('app')
        .directive('spdAboutHeader', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/about-header/about-header.html"
        };
    }
})();