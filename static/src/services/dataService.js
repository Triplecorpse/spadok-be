(function() {
    angular.module('app').service('dataService', ['$http', function ($http) {

    function init() {
        var date = new Date();

        var defaultProject = {
            name: "Добро пожаловать",
            description: "К сожалению, на данный момент нет ни одного активного проекта. Чтобы создать проект, нужно зайти в администраторскую панель и воспользоваться соответствующим функционалом.",
            collected: 0,
            days: 0,
            people: 0
        };

        return $http.get(`${window.location.origin}/api/projects`)
            .then((response) => {
                if (response.data.length) {
                    let projects = response.data.filter((element) => {
                        let days = new Date(element.date) - date;
                        element.days = Math.floor(days / 86400000);
                        return days >= 0;
                    });
                    if (projects.length) {
                        this.projects = response.data;
                    } else {
                        this.projects = [defaultProject]
                    }
                } else {
                    this.projects = [defaultProject]
                }
                delete response.data;
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
            init
        };
    }]);
})();