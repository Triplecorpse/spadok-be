(function() {
    angular.module('app').service('dataService', ['$http', function ($http) {
    var origin = window.location.protocol + '//' + window.location.host; //IE10 crunch

    function init() {
        var date = new Date();

        var defaultProject = {
            name: "Добро пожаловать",
            description: "К сожалению, на данный момент нет ни одного активного проекта. Чтобы создать проект, нужно зайти в администраторскую панель и воспользоваться соответствующим функционалом.",
            collected: 0,
            days: 0,
            people: 0
        };

        return $http.get(`${origin}/api/projects`)
            .then((response) => {
                if (response.data.length) {
                    let projects = _.map(response.data,(element) => {
                        let days = new Date(element.date) - date;
                        element.days = Math.ceil(days / 86400000);
                        element.bucks = Math.round(element.money / 26)
                    });
                    if (projects.length) {
                        this.projects = response.data;
                    } else {
                        this.projects = [defaultProject]
                    }
                } else {
                    this.projects = [defaultProject]
                }
                return response;
            }, (reason) => {
                return reason;
            });
        }
        
        return {
            projects: [],
            videos: [],
            reviews: [],
            partners: [],
            team: [],
            contacts: {},
            init,
            origin
        };
    }]);
})();