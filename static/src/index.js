angular.module('app', ['ksSwiper']);
angular.module('app').controller('appController', appController);

function appController() {
    var vm = this;
    vm.title = "Спадок";

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}