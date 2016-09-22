(function() {
    angular
        .module('app')
        .directive('spdStats', [function () {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/stats/stats.html",
                scope: {
                    people: "=",
                    money: "=",
                    days: "="
                },
                controller: ["$scope", controller]
            };

            function controller($scope) {
                let ruHandler = [
                    {
                        ends: '1',
                        handler: () => {}
                    }
                ]
            }
        }
    ]);
})();