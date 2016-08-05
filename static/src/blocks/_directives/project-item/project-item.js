(function() {
    angular
        .module('app')
        .directive('spdProjectItem', ['$timeout', function () {

            return {
                restrict: "E",
                templateUrl: "./blocks/_directives/project-item/project-item.html",
                scope: {
                    project: "="
                },
                link: link
            };

            function link(scope, element, attributes) {
                // console.log(element);
            }
        }
        ]);
})();