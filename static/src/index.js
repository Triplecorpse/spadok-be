angular.module('app', ['ksSwiper', 'ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var states = ['contacts', 'about', 'project', 'projects', 'e404'];

    $urlRouterProvider.otherwise("/e404");

    $stateProvider.state("/", {
        url: "/",
        templateUrl: "states/index/index.html",
        controller: "mainController",
        controllerAs: "main"
    });

    states.forEach((element) => {
        $stateProvider.state(element, {
            url: `/${element}`,
            templateUrl: `./states/${element}/${element}.html`,
            controller: `${element}Controller`,
            controllerAs: `${element}`
        })
    });
    console.log($stateProvider);
}]);

angular.module('app').controller('appController', function() {

    var vm = this;
    vm.title = "Спадок";

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };

});