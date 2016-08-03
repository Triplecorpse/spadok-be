angular.module('app', ['ksSwiper']);

// angular.module('app').config(['$stateProvider', '$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
//     var states = ['contacts', 'about', 'project', 'projects'];
//
//     states.forEach((element) => {
//         $stateProvider.state(element, {
//             url: `/${element}`,
//             templateUrl: `./states/${element}/${element}.html`,
//             controller: `${element}Controller`,
//             controllerAs: `${element}`
//         })
//     });
// }]);

angular.module('app').controller('appController', function() {

    var vm = this;
    vm.title = "Спадок";

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };

});