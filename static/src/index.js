angular.module('app', ['ksSwiper', 'ui.router', '720kb.socialshare', 'angularModalService', 'pascalprecht.translate', 'ngCookies', 'ngSanitize']);

angular.module('app').config(['$stateProvider', '$urlRouterProvider', '$translateProvider', function($stateProvider, $urlRouterProvider, $translateProvider) {
    var states = ['contacts', 'about', 'partners', 'projects'];

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

    $translateProvider.fallbackLanguage('ru');
    $translateProvider.usePostCompiling(true);
    $translateProvider.registerAvailableLanguageKeys(['en', 'ru'], {
        'en_*': 'en',
        'ru_*': 'ru'
    });
    $translateProvider.determinePreferredLanguage();
    $translateProvider.useLocalStorage();
    $translateProvider.preferredLanguage('ru');
    $translateProvider.useLoader('i18nFactory');
}]);

angular.module('app').controller('appController', ['$window', '$scope', 'dataService', '$translate', function($window, $scope, dataService, $translate) {

    var langDic = {
        ru: 'рус',
        en: 'eng'
    };
    var vm = this;
    vm.title = "Спадок";
    vm.activeLang = langDic[localStorage.NG_TRANSLATE_LANG_KEY] || langDic.ru;

    dataService.init()
        .then(() => {
            vm.isDataLoaded = true;
        });

    $(window).scroll(() => {
        if(vm.showLang) {
            vm.showLang = false;
            $scope.$apply();
        }
    });

    vm.handleLangMenu = (event) => {
        if(!event.target.classList.contains('lang-list-current')) {
            vm.showLang = false;
            if (event.target.classList.contains('lang-list-item')) {
                $translate.use(event.target.getAttribute('code'));
                vm.activeLang = langDic[event.target.getAttribute('code')];
            }
        }
    };

    $scope.$on('$locationChangeSuccess', () => {
        window.scrollTo(0, 0);
    });

    String.prototype.splice = function(start, delCount, newSubStr) {
        return this.slice(0, start) + newSubStr + this.slice(start + Math.abs(delCount));
    };
}]);