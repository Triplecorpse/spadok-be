(function() {
    angular.module('app').directive('spdProjectsList', function directive () {
        return {
            restrict: "E",
            templateUrl: "./blocks/projects-list/projects-list.html",
            controller: ["$scope", "dataService", controller]
        };

        function controller($scope, dataService) {

            $scope.statsOptions = {
                textes: [" волонтёров", " необходимо", " дней осталось"],
                simpleText: true
            };
            $scope.loadProjects = (event) => {
                if(event.target.classList.contains('projects-list-button')) {
                    $('.projects-list-button.active').removeClass('active');
                    event.target.classList.add('active');
                }
            };

            $scope.projects = dataService.projects;
        }
    });
})();