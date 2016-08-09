(function() {
    angular
        .module('app')
        .directive('spdaListManager', ['$http', 'viewService', 'dataService', projecManager]);

    function projecManager ($http, viewService, dataService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/list-manager/list-manager.html",
            scope: {
                entity: '='
            },
            controller: ['$scope', controller],
            controllerAs: 'list'
        };

        function controller($scope) {
            $scope.model = dataService[$scope.entity];
            $scope.view = 'new';

            $scope.$watch(() => viewService.state, (newVal) => {
                $scope.state = newVal;
                $scope.model = dataService[newVal];
            });

            viewService.updateProjects = dataService.init.bind(this);
            viewService.updateProjects();
        }
    }
})();