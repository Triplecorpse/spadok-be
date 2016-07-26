angular.module('app', []);
angular.module('app').controller('appController', appController);

function appController() {
    var vm = this;
    vm.title = "Adminium - spadok";
    vm.isLoggedIn = true;
}