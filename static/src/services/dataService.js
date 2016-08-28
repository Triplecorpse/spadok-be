(function() {
    angular.module('app').service('dataService', ['$http', '$q', function ($http, $q) {
        var origin = window.location.protocol + '//' + window.location.host; //IE10 crunch
        var self = this;
        var dataQ = $q.defer();
        var data = {
            init,
            origin,
            dataQ
        };

        function init() {
            var date = new Date();

            function parsePage(list) {

            }

            function parsePartners(list) {

            }

            function parseProjects(list) {
                data.projects = _.map(list, (element) => {
                    let days = new Date(element.date) - date;
                    element.days = Math.ceil(days / 86400000);
                    element.bucks = Math.round(element.money / 26);
                    return element;
                });

                console.log(":::: DATASERVICE PROJECTS ::::", data.projects);
            }

            function parseReviews(list) {

            }

            function parseUsers(list) {

            }

            function parseVideos(list) {

            }

            dataQ = $http.get(`${origin}/api/getall`)
                .then((response) => {
                    parsePage(response.data[0]);
                    parsePartners(response.data[1]);
                    parseProjects(response.data[2]);
                    parseReviews(response.data[3]);
                    parseUsers(response.data[4]);
                    parseVideos(response.data[5]);
                    // dataQ.promise.resolve(response);
                    return response;
                }, (reason) => {
                    return reason;
                });

            return dataQ;

        }

        return data;
    }]);
})();