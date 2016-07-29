(function() {
    angular
        .module('app')
        .service('viewService', ['$http', viewService]);

    function viewService ($http) {

        return {
            state: 'login',
            pmState: 'none'
        };

    }
})();