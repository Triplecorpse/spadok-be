angular.module('app').controller('projectController', ['$stateParams', 'dataService', function($stateParams, dataService) {
    var vm = this;
    vm.project = _.find(dataService.projects, (element) => {
        return element._id === $stateParams.projectId;
    });
    console.log(vm.project);
    document.title = `${vm.project.name} - Спадок`;
}]);