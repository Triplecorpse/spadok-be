(function() {
    angular.module('app').directive('spdProjectsList', ['dataService', function(dataService) {
        return {
            restrict: "E",
            templateUrl: "./blocks/projects-list/projects-list.html",
            controller: ["$scope", controller],
            link: link
        };

        function controller($scope) {
            $scope.statsOptions = {
                textes: [" волонтёров", " необходимо", " дней осталось"],
                simpleText: true
            };
        }

        function link(scope) {
            loadProjects('actual');
            function loadProjects(name) {
                if(name === 'actual') {
                    scope.projects = _.filter(dataService.projects, (element) => {
                        return element.isCompleted === false;
                    });
                } else if(name === 'completed') {
                    scope.projects = _.filter(dataService.projects, (element) => {
                        return element.isCompleted === true;
                    });
                } else {
                    console.error('Unhandled error happened in projects list -> loadProjects');
                }
            }
            scope.setProjectsCategory = (event) => {
                if(event.target.classList.contains('projects-list-button')) {
                    $('.projects-list-button.active').removeClass('active');
                    event.target.classList.add('active');
                }
                loadProjects(event.target.name);
            };
        }

    }]);
})();