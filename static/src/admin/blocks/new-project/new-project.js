(function() {
    angular
        .module('app')
        .directive('spdaNewProject', ['$http', 'viewService', '$interval', '$timeout', 'dataService', directive]);

    function directive ($http, viewService, $interval, $timeout, dataService) {
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
            controller: ['$scope', 'FileUploader', controller]
        };

        function controller($scope, FileUploader) {
            var vm = this;
            var action;

            $scope.uploaderSingle = new FileUploader({
                removeAfterUpload: true
            });
            $scope.uploaderBatch = new FileUploader({
                removeAfterUpload: true
            });

            $scope.projects = dataService.projects;
            $scope.$watch(() => $scope.init, (newVal) => {
                if(newVal) {
                    $scope.name = newVal.name;
                    $scope.description = newVal.description;
                    $scope.people = newVal.people;
                    $scope.money = newVal.money;
                    $scope.date = new Date(newVal.date);
                    $scope.isPublished = newVal.isPublished;
                    $scope.isCompleted = newVal.isCompleted;
                } else {
                    $scope.name = $scope.description = $scope.people = $scope.money = $scope.date = $scope.isCompleted = $scope.isPublished = null;
                }
            }, true);

            $scope.submit = (form, event) => {
                $scope.isQueriing = true;
                if(event.target.getAttribute('form-type') === "new") {
                    add();
                    action = 'add';
                } else if(event.target.getAttribute('form-type') === "edit") {
                    update();
                    action = 'update';
                } else {
                    fail()
                }
            };

            $scope.delete = () => {
                $http.delete(`/adminium/removeproject/${$scope.init._id}`)
                    .then(success, fail);
                action = 'delete';
            };

            function add() {
                $http.post('/adminium/addproject', {
                    name: $scope.name || '',
                    description: $scope.description || '',
                    people: $scope.people || 0,
                    money: $scope.money || 0,
                    date: $scope.date || new Date(),
                    isCompleted: $scope.isCompleted || false,
                    isPublished: $scope.isPublished || false
                })
                    .then(success, fail);
            }

            function update()  {
                $http.put('/adminium/updateproject', {
                    _id: $scope.init._id,
                    name: $scope.name,
                    description: $scope.description,
                    people: $scope.people,
                    money: $scope.money,
                    date: $scope.date,
                    isCompleted: $scope.isCompleted,
                    isPublished: $scope.isPublished
                })
                    .then(success, fail);
            }

            function success(data) {
                $scope.statusText = s200;
                $scope.statusClassName = "label label-success";
                $scope.isQueriing = false;
                $scope.name = $scope.description = $scope.people = $scope.money = $scope.date = $scope.isCompleted = $scope.isPublished = null;
                dataService.init();
                viewService.highlightAdd();
                final();
                if(action === 'add' || action === 'update') {
                    uploadFiles(data.data._id);
                }
                action = '';
                return data;
            }

            function fail(data) {
                if(data.status === 401) {
                    $scope.statusText = s401;
                } else if(data.status === 500) {
                    $scope.statusText = s500;
                } else {
                    $scope.statusText = `${data.status} ${data.statusMessage} ${sOther}`;
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

            function uploadFiles(id) {
                console.log($scope.uploaderSingle);
                console.log($scope.uploaderBatch);
                $scope.uploaderSingle.onBeforeUploadItem = function (item) {
                    item.url = `${window.location.origin}/adminium/projectimg/${id}/main`;
                };
                $scope.uploaderBatch.onBeforeUploadItem = function (item) {
                    item.url = `${window.location.origin}/adminium/projectimg/${id}/gallery`;
                };
                // $scope.uso = {url:`${window.location.origin}/adminium/projectimg/${id}/main`};
                // $scope.uploaderSingle.url = `${window.location.origin}/adminium/projectimg/${id}/main`;
                // $scope.uploaderBatch.url = `${window.location.origin}/adminium/projectimg/${id}/gallery`;
                // $scope.uploaderSingle.removeAfterUpload = true;
                // $scope.uploaderBatch.removeAfterUpload = true;
                $scope.uploaderSingle.uploadAll();
                $scope.uploaderBatch.uploadAll();
            }
        }
    }
})();