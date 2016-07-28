(function() {
    angular
        .module('app')
        .directive('spdFooter', [footer]);

    function footer () {

        return {
            restrict: "E",
            templateUrl: "./blocks/footer/footer.html",
            controller: [footerController],
            controllerAs: 'footer',
            link: link
        };

        function footerController() {

        }

        function link() {

        }
    }
})();