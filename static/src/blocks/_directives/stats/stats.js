(function() {
    angular
        .module('app')
        .directive('spdStats', ['$timeout', function () {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/stats/stats.html",
                scope: {
                    people: "=",
                    money: "=",
                    days: "=",
                    options: "="
                },
                link: link
            };

            function link(scope, element, attributes) {
                console.log(element);
            }
        }
    ]);
})();