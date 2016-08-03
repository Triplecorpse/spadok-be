angular.module('app', ['ksSwiper', 'ui.router']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var states = ['contacts', 'about', 'project', 'partners', 'projects', 'e404'];

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("index", {
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
}]);

angular.module('app').controller('appController', ['$window', function($window) {

    var vm = this;
    vm.title = "Спадок";
    var lang = $window.navigator.languages[0] || $window.navigator.language || $window.navigator.userLanguage;

    console.log(lang);

    vm.hideLangMenu = (event) => {
        console.log(event);
        if(!event.target.classList.contains('lang-list-current')) {
            vm.showLang = false;
        }
    };

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };

}]);