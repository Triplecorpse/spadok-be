(function() {
    angular
        .module('app')
        .service('dataService', ['$http', function ($http) {
            var origin = window.location.protocol + '//' + window.location.host; //IE10 crunch

            function init() {
                this.isLoading = true;
                return $http.get(`${origin}/adminium/getall`)
                    .then((response) => {
                        this.page = response.data[0][0];
                        this.partners = response.data[1];
                        this.projects = response.data[2];
                        this.reviews = response.data[3];
                        this.users = response.data[4];
                        this.isLoading = false;
                        return response;
                    })
            }

            return {
                projects: [],
                reviews: [],
                partners: [],
                users: [],
                page: {},
                init
            };

        }]);
})();