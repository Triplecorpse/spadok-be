angular.module('app', ['ksSwiper']);
angular.module('app').controller('appController', appController);

function appController() {
    var vm = this;
    vm.title = "Spadok";
}