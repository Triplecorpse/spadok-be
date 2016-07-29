angular.module('app', []);

angular.module('app').controller('appController', ['$scope', 'viewService', '$http', appController]);

function appController($scope, viewService, $http) {
    var vm = this;
    vm.title = "Spadok - adminium";
    $http.get('/isloggedin')
        .then(() => {
            vm.isLoggedIn = true;
            viewService.state = vm.state = 'projectManager';
        }, () => {
            viewService.state = vm.state = 'login';
        });
    $scope.$watch(() => viewService.state, () => {
        vm.state = viewService.state;
    })
}