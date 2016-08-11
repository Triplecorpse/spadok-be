(function() {
    angular
        .module('app')
        .directive('spdProjectItem', ['$location', 'dataService', function ($location) {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/project-item/project-item.html",
                scope: {
                    project: "="
                },
                link: link
            };

            function link(scope) {
                scope.goto = (id) => {
                    $location.path(`/project/${id}`);
                }
            }
        }
        ]);
})();