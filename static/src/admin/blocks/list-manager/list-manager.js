(function() {
    angular
        .module('app')
        .directive('spdaPorjectManager', ['$http', 'viewService', 'dataService', projecManager]);

    function projecManager ($http, viewService, dataService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/project-manager/project-manager.html",
            controller: ['$scope', controller]
        };

        function controller($scope) {
            viewService.subState = $scope.state = 'new-project';
            $scope.projects = dataService.projects;

            $scope.$watch(() => viewService.subState, (newVal) => {
                $scope.state = newVal;
            });

            var update = () => {
                $http.get('/adminium/getprojects')
                    .then((response) => {
                    })
            };

            viewService.updateProjects = update.bind(this);
            viewService.updateProjects();
        }
    }
})();