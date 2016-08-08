(function() {
    angular
        .module('app')
        .directive('spdProjectItem', ['$location', 'dataService', function ($location, dataService) {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/project-item/project-item.html",
                scope: {
                    project: "="
                },
                link: link
            };

            function link(scope, element, attributes) {
                scope.goto = (id) => {
                    console.log($location.path());
                    console.log($location.path(`/project/${scope.project._id}`));
                }
            }
        }
        ]);
})();