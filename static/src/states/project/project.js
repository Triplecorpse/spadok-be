angular.module('app').controller('projectController', ['$stateParams', 'dataService', '$scope', function($stateParams, dataService, $scope) {
    var vm = this;
    $scope.$watch(() => $scope.$parent.app.isProjectsLoaded, () => {
        vm.project = _.find(dataService.projects, (element) => {
            return element._id === $stateParams.projectId;
        });
        vm.isProjectLoaded = true;
        document.title = `${vm.project.rusName} - Спадок`;
    });
}]);