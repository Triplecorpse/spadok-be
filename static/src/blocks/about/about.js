(function() {
    angular
        .module('app')
        .directive('spdAbout', [about]);

    function about () {

        return {
            restrict: "E",
            templateUrl: "./blocks/about/about.html",
            link: link
        };

        function link() {
            $('div#about-image').width($('div#about-block').offset().left);
            $(window).resize(() => {
                $('div#about-image').width($('div#about-block').offset().left);
            });
        }
    }
})();