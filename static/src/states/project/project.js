angular.module('app').controller('projectController', ['$stateParams', 'dataService', '$scope', function($stateParams, dataService, $scope) {
    var vm = this;
    vm.project = _.find(dataService.projects, (element) => {
        return element._id === $stateParams.projectId;
    });
    console.log(vm.project);
    document.title = `${vm.project.rusName} - Спадок`;
    console.log($scope);
}]);