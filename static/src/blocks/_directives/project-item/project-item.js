(function() {
    angular.module('app').directive('spdProjectItem', [function() {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/project-item/project-item.html",
                scope: {
                    project: "="
                },
                controller: ['$scope', '$location', controller]
            };

            function controller($scope, $location) {
                $scope.goto = (id) => {
                    // window.scrollTo(0, 0);
                    $location.path(`/project/${id}`);
                }
            }
        }
        ]);
})();