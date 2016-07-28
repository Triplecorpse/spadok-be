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
                new Partner("media/Lipton.png", "media/Lipton.png"),
                new Partner("media/Philip-Morris-International-Logo-EPS-vector-image.png", "media/Philip-Morris-International-Logo-EPS-vector-image.png"),
                new Partner("media/PGPhaseLogo.png", "media/PGPhaseLogo.png"),
                new Partner("media/McDonalds.png", "media/McDonalds-gray.png"),
                new Partner("media/nestle_chocolate.png", "media/nestle_chocolate.png"),
                new Partner("media/Statbucks-logo-png.png", "media/Statbucks-logo-png.png"),
                new Partner("media/Burger_King_Logo.png", "media/Burger_King_Logo.png"),
                new Partner("media/Dell_Logo.png", "media/Dell_Logo.png"),
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