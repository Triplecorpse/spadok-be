(function() {
    angular
        .module('app')
        .directive('spdPageHeader', [pageHeader]);

    function pageHeader () {

        return {
            restrict: "E",
            templateUrl: "./blocks/page-header/page-header.html",
            controller: ['$location', controller],
            controllerAs: 'header',
            link: link
        };

        function controller($location) {
            var vm = this;

            vm.gotoIndex = () => {
                $location.url("/");
            };

            vm.isActive = (path) => {
                return $location.path() === path;
            };
        }

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