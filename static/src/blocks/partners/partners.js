(function() {
    angular
        .module('app')
        .directive('spdPartners', [partners]);

    function partners () {

        return {
            restrict: "E",
            templateUrl: "./blocks/partners/partners.html",
            controller: [partnersController],
            controllerAs: 'partners',
            link: link
        };

        function partnersController() {
            var vm = this;

            class Partner {
                constructor(coloredLogo, greydLogo) {
                    angular.extend(this, {
                        coloredLogo,
                        greydLogo
                    })
                }
            }

            vm.partners = [
                new Partner("media/Lipton.png", "media/Lipton2.png"),
                new Partner("media/Philip-Morris-International-Logo-EPS-vector-image.png", "media/Philip-Morris2.png"),
                new Partner("media/PGPhaseLogo.png", "media/PG2.png"),
                new Partner("media/McDonalds.png", "media/McDonalds2.png"),
                new Partner("media/nestle_chocolate.png", "media/nestle2.png"),
                new Partner("media/Statbucks-logo-png.png", "media/Statbucks2.png"),
                new Partner("media/Burger_King_Logo.svg.png", "media/Burger_King2.png"),
                new Partner("media/Dell_Logo.png", "media/Dell2.png"),
            ];

            vm.color = (index) => {
                vm.grayed = vm.partners[index].greydLogo;
                vm.partners[index].greydLogo = vm.partners[index].coloredLogo;
            };

            vm.decolor = (index) => {
                vm.partners[index].greydLogo = vm.grayed;
            };
        }

        function link() {

        }
    }
})();