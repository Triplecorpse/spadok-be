(function() {
    angular.module('app').service('dataService', ['$http', function ($http) {
    var origin = window.location.protocol + '//' + window.location.host; //IE10 crunch
    var self = this;
    var data = {
        init,
        origin
    };

    function init() {
        var date = new Date();

        var defaultProject = {
            name: "Добро пожаловать",
            description: "К сожалению, на данный момент нет ни одного активного проекта. Чтобы создать проект, нужно зайти в администраторскую панель и воспользоваться соответствующим функционалом.",
            collected: 0,
            days: 0,
            people: 0
        };

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

            data.projectsActive = _.filter(data.projects, (element) => {
                return element.isCompleted == false;
            });

            data.projectsCompleted = _.filter(data.projects, (element) => {
                return element.isCompleted == true;
            });

            // if (!self.projects.length) {
            //     self.projects = [defaultProject];
            // }
            //
            // if (!self.projectsActive.length) {
            //     self.projectsActive = [defaultProject];
            // }
            //
            // if (!self.projectsCompleted.length) {
            //     self.projectsCompleted = [defaultProject];
            // }
            console.log(":::: DATASERVICE PROJECTS ::::", self.projects, self.projectsActive, self.projectsCompleted);
        }

        function parseReviews(list) {

        }

        function parseUsers(list) {

        }

        function parseVideos(list) {

        }

        return $http.get(`${origin}/api/getall`)
            .then((response) => {
                parsePage(response.data[0]);
                parsePartners(response.data[1]);
                parseProjects(response.data[2]);
                parseReviews(response.data[3]);
                parseUsers(response.data[4]);
                parseVideos(response.data[5]);
                return response;
            }, (reason) => {
                return reason;
            });
        }
        
        return data;
        // {
        //     projects: [],
        //     projectsActive: [],
        //     projectsCompleted: [],
        //     videos: [],
        //     reviews: [],
        //     partners: [],
        //     team: [],
        //     contacts: {},
        //     init,
        //     origin
        // }
    }]);
})();