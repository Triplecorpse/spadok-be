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
            viewService.state = 'projects';
            $scope.model = dataService[viewService.state];
            $scope.view = 'new';

            $scope.$watch(() => viewService.state, (newVal) => {
                $scope.state = newVal;
                $scope.model = dataService[newVal];
            });

            $scope.$watch(() => dataService, () => {
                $scope.isLoading = dataService.isLoading;
                $scope.model = dataService[viewService.state];
            }, true);

            viewService.updateProjects = dataService.init.bind(this);
            viewService.updateProjects();

            $scope.isLoading = dataService.isLoading;
            $scope.model = dataService[viewService.state];


            $scope.edit = (event, index, entity) => {
                $(".list-group-item").removeClass('active');
                event.currentTarget.classList.add('active');
                $scope.view = 'edit';
                $scope.active = entity;
            };

            $scope.add = (event, entity) => {
                $(".list-group-item").removeClass('active');
                $("#new").addClass("active");
                $scope.view = 'new';
                $scope.active = {};
            };

            viewService.highlightAdd = $scope.add.bind(this);
        }
    }
})();