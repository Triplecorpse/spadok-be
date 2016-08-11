angular.module('app', ['ksSwiper', 'ui.router', '720kb.socialshare']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    var states = ['contacts', 'about', 'partners', 'projects', 'e404'];

    $urlRouterProvider.otherwise("/");

    $stateProvider.state("index", {
        url: "/",
        templateUrl: "states/index/index.html",
        controller: "mainController",
        controllerAs: "main"
    }).state("project", {
        url: "/project/{projectId}",
        templateUrl: "states/project/project.html",
        controller: "projectController",
        controllerAs: "project"
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

angular.module('app').controller('appController', ['$window', '$scope', 'dataService', function($window, $scope, dataService) {

    var vm = this;
    vm.title = "Спадок";
    dataService.init()
        .then(() => {
            vm.isProjectsLoaded = true;
    });

    $(window).scroll(() => {
        if(vm.showLang) {
            vm.showLang = false;
            $scope.$apply();
        }
    });

    vm.hideLangMenu = (event) => {
        if (!event.target.classList.contains('lang-list-current')) {
            vm.showLang = false;
        }
    };

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}]);