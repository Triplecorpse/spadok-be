(function() {
    angular
        .module('app')
        .directive('spdPageHeader', [pageHeader]);

    function pageHeader () {

        return {
            restrict: "E",
            templateUrl: "./blocks/page-header/page-header.html",
            link: link
        };

        function link(scope) {

        }
    }
})();