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
                    $location.path(`/project/${id}`);
                }
            }
        }
        ]);
})();