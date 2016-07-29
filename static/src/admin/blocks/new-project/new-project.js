(function() {
    angular
        .module('app')
        .directive('spdaNewProject', ['$http', 'viewService', directive]);

    function directive ($http, viewService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/new-project/new-project.html",
            controller: ['$scope', controller],
            link: link
        };

        function controller($scope) {
            var vm = this;

            $scope.$watch(() => viewService.pmState, () => {
                vm.state = viewService.pmState;

                vm.addProject = () => {

                };

                vm.editProject = (index) => {

                };
            })
        }

        function link(scope) {
            // viewService.state = "projectManager"
        }
    }
})();