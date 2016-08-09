(function() {
    angular
        .module('app')
        .directive('spdAboutCommunity', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/about-community/about-community.html"
        };
    }
})();