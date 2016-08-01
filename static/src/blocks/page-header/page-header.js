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
            $(window).scroll(() => {
                if($(window).scrollTop() > 0) {
                    $('#page-header').addClass('page-header-sticky');
                } else {
                    $('#page-header').removeClass('page-header-sticky');
                }
            });
        }
    }
})();