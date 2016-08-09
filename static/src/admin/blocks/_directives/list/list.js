(function() {
    angular
        .module('app')
        .directive('spdaList', ['$http', 'viewService', 'dataService', projecManager]);

    function projecManager ($http, viewService, dataService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/_directives/list/list.html",
            scope: {
                entity: '='
            },
            controller: ['$scope', controller]
        };

        function controller($scope) {
            console.log($scope.model);
            $scope.isLoading = dataService.isLoading;
            $scope.model = dataService[viewService.state];

            $scope.$watch(() => dataService[viewService.state], () => {
                $scope.model = dataService[viewService.state];
            }, true);

            $scope.edit = (event, index, entity) => {
                $(".list-group-item").removeClass('active');
                event.currentTarget.classList.add('active');
                $scope.$parent.view = 'edit';
                $scope.$parent.active = entity;
            };

            $scope.add = (event, entity) => {
                $(".list-group-item").removeClass('active');
                $("#new").addClass("active");
                $scope.$parent.view = 'new';
                $scope.$parent.active = {};
            };

            viewService.highlightAdd = $scope.add.bind(this);
        }
    }
})();