angular.module('app', ['angularFileUpload']);

angular.module('app').controller('appController', ['$scope', 'viewService', 'dataService', '$http', appController]);

function appController($scope, viewService, dataService, $http) {
    var vm = this;
    vm.title = "Spadok - adminium";
    vm.isDataLoaded = false;

    function getall() {
        $http.get('/adminium/isloggedin')
            .then(() => {
                vm.isLoggedIn = true;
                vm.canLogin = false;
                viewService.state = 'projects';
                dataService.init()
                    .finally(() => {
                        vm.isDataLoaded = true;
                        viewService.state = 'projects';
                    });
            }, () => {
                viewService.state = 'login';
                vm.canLogin = true
            });
    }
    getall();

    $scope.$watch(() => viewService.state, (newVal) => {
        if(newVal !== 'login') {
            vm.canLogin = false;
            vm.isLoggedIn = true;
            vm.isDataLoaded = true;
        }
        vm.state = newVal;
    });

    vm.isActive = (state) => {
        return state === viewService.state;
    };

    vm.setActive = (state) => {
        viewService.state = state;
    };
}