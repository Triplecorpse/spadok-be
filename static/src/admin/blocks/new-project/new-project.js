(function() {
    angular
        .module('app')
        .directive('spdaNewProject', ['$http', 'viewService', '$interval', '$timeout', directive]);

    function directive ($http, viewService, $interval, $timeout) {
        const s200 = "Congrats! Your operation was successfully completed! :)";
        const s401 = "Sorry, something was happened with your session. Please, reenter your credentials :(";
        const s500 = "Sorry, something was happened with server. Wait a few minutes or contact your administrator :(";
        const sOther = "Sorry, unhandled error occurred. Wait a few minutes or contact your administrator :(";

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
                    $scope.date = new Date(newVal.date);
                    $scope.isPeopleShown = newVal.isPeopleShown;
                    $scope.isMoneyShown = newVal.isMoneyShown;
                    $scope.isDaysShown = newVal.isDaysShown;
                    $scope.isPublished = newVal.isPublished;
                } else {
                    $scope.name = $scope.description = $scope.people = $scope.money = $scope.date = $scope.isPeopleShown = $scope.isMoneyShown = $scope.isDaysShown = $scope.isPublished = null;
                }
            }, true);

            $scope.submit = (form, event) => {
                $scope.isQueriing = true;
                if(event.target.getAttribute('form-type') === "new-project") {
                    add();
                } else if(event.target.getAttribute('form-type') === "edit-project") {
                    update();
                }

            };

            $scope.delete = () => {
                $http.post('/adminium/removeproject', {
                    id: $scope.init._id
                })
                    .then(success, fail);
            };

            function add() {
                $http.post('/adminium/addproject', {
                    name: $scope.name,
                    description: $scope.description,
                    people: $scope.people,
                    money: $scope.money,
                    date: $scope.date,
                    isPeopleShown: $scope.isPeopleShown,
                    isMoneyShown: $scope.isMoneyShown,
                    isDaysShown: $scope.isDaysShown,
                    isPublished: $scope.isPublished
                })
                    .then(success, fail);
            }

            function update()  {
                $http.post('/adminium/updateproject', {
                    _id: $scope.init._id,
                    name: $scope.name,
                    description: $scope.description,
                    people: $scope.people,
                    money: $scope.money,
                    date: $scope.date,
                    isPeopleShown: $scope.isPeopleShown,
                    isMoneyShown: $scope.isMoneyShown,
                    isDaysShown: $scope.isDaysShown,
                    isPublished: $scope.isPublished
                })
                    .then(success, fail);
            }

            function success(data) {
                $scope.statusText = s200;
                $scope.statusClassName = "label label-success";
                $scope.isQueriing = false;
                $scope.name = $scope.description = $scope.people = $scope.money = $scope.date = $scope.isPeopleShown = $scope.isMoneyShown = $scope.isDaysShown = $scope.isPublished = null;
                viewService.updateProjects();
                final();
                return data;
            }

            function fail(data) {
                if(data.status === 401) {
                    $scope.statusText = s401;
                } else if(data.status === 500) {
                    $scope.statusText = s500;
                } else {
                    $scope.statusText = sOther;
                }
                $scope.statusClassName = "label label-danger";
                final();
                return data;
            }

            function final() {
                $scope.isQueriing = false;
                $scope.canDelete = false;
                $timeout(() => {
                    $scope.statusText = "";
                    $scope.statusClassName = "";
                }, 3000);
            }
        }
    }
})();