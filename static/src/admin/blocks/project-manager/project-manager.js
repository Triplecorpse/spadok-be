(function() {
    angular
        .module('app')
        .directive('spdaPorjectManager', ['$http', 'viewService', projecManager]);

    function projecManager ($http, viewService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/project-manager/project-manager.html",
            controller: ['$scope', controller],
            link: link
        };

        function controller($scope) {
            var vm = this;

            viewService.pmState = $scope.state = 'new-project';

            $scope.$watch(() => viewService.pmState, () => {
                $scope.state = viewService.pmState;
            });

            $scope.addProject = (event) => {
                $(".list-group-item").removeClass('active');
                $("#new-project").addClass("active");
                viewService.pmState = $scope.state = 'new-project';
                $scope.activeProject = undefined;
            };

            $scope.editProject = (event, index) => {
                $(".list-group-item").removeClass('active');
                event.currentTarget.className += ' active';
                viewService.pmState = $scope.state = 'edit-project';
                $scope.activeProject = $scope.projects[index];
            };

            var update = () => {
                $http.get('/adminium/getprojects')
                    .then((response) => {
                        $scope.projects = response.data;
                        $scope.addProject();
                    })
            };

            viewService.updateProjects = update.bind(this);
            viewService.updateProjects();
        }

        function link(scope) {
            // viewService.state = "projectManager"
        }
    }
})();