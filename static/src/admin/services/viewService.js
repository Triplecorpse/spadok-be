(function() {
    angular
        .module('app')
        .service('viewService', ['$http', viewService]);

    function viewService ($http) {

        return {
            state: 'none',
            subState: 'none',
            updateProjects: undefined
        };

    }
})();