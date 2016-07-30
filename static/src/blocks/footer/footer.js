(function() {
    angular
        .module('app')
        .directive('spdFooter', [footer]);

    function footer () {

        return {
            restrict: "E",
            templateUrl: "./blocks/footer/footer.html",
            controller: [footerController],
            controllerAs: 'footer'
        };

        function footerController() {
            var vm = this;

            if(new Date().getYear() > 2016) {
                vm.copyright = ` - ${new Date().getYear()}`;
            } else {
                vm.copyright = "";
            }
        }
    }
})();