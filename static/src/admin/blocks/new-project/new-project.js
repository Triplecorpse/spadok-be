(function() {
    angular
        .module('app')
        .directive('spdaNewProject', ['$http', 'viewService', '$interval', directive]);

    function directive ($http, viewService, $interval) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/new-project/new-project.html",
            scope: {
                init: "=",
                view: "="
            },
            controller: ['$scope', controller]
        };

        function controller($scope) {
            var vm = this;
            $scope.$watch(() => $scope.init, (newVal) => {
                if(newVal) {
                    $scope.name = newVal.name;
                    $scope.description = newVal.description;
                    $scope.people = newVal.people;
                    $scope.money = newVal.money;
                    $scope.days = newVal.days;
                    $scope.isPeopleShown = newVal.isPeopleShown;
                    $scope.isMoneyShown = newVal.isMoneyShown;
                    $scope.isDaysShown = newVal.isDaysShown;
                    $scope.isPublished = newVal.isPublished;
                } else {
                    $scope.name = $scope.description = $scope.people = $scope.money = $scope.days = $scope.isPeopleShown = $scope.isMoneyShown = $scope.isDaysShown = $scope.isPublished = null;
                }
            }, true);

            $scope.submit = (form) => {
                $scope.isQueriing = true;
                $http.post('/adminium/addproject', {
                    name: $scope.name,
                    description: $scope.description,
                    people: $scope.people,
                    money: $scope.money,
                    days: $scope.days,
                    isPeopleShown: $scope.isPeopleShown,
                    isMoneyShown: $scope.isMoneyShown,
                    isDaysShown: $scope.isDaysShown,
                    isPublished: $scope.isPublished
                })
                    .then(success, fail)
                    .finally(() => {
                        // $("#new-project").addClass("active");
                    });

                function success(data) {
                    $scope.statusText = "Congrats! Your project was successfully saved! :)";
                    $scope.statusClassName = "label label-success";
                    $scope.isQueriing = false;
                    $scope.name = $scope.description = $scope.people = $scope.money = $scope.days = $scope.isPeopleShown = $scope.isMoneyShown = $scope.isDaysShown = $scope.isPublished = null;
                    viewService.updateProjects();
                    return data;
                }

                function fail(data) {
                    if(data.status === 401) {
                        $scope.statusText = "Sorry, something was happened with your session. Please, reenter your credentials :(";
                    } else if(data.status === 500) {
                        $scope.statusText = "Sorry, something was happened with server. Wait a few minutes or contact your administrator :(";
                    } else {
                        $scope.statusText = "Sorry, unhandled error occurred. Wait a few minutes or contact your administrator :(";
                    }
                    $scope.statusClassName = "label label-danger";
                    $scope.isQueriing = false;
                    return data;
                }
            };

            $scope.delete = () => {
                $http.post('/adminium/removeproject', {
                    id: $scope.init._id
                })
                    .finally(() => {
                        viewService.updateProjects();
                        $scope.canDelete = false;
                        // $("#new-project").addClass("active")
                    })
            }
        }
    }
})();