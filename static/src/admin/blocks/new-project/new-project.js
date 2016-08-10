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
            $scope.filesStatus = 0;
            $scope.video = {};
            $scope.parentProject = {rusName: "None"};

            $scope.$watch(() => dataService.isLoading, () => {
                $scope.isLoading = dataService.isLoading;
                $scope.projects = dataService.projects;
            });

            $scope.uploaderSingle = new FileUploader({
                removeAfterUpload: true
            });
            $scope.uploaderBatch = new FileUploader({
                removeAfterUpload: true
            });
            $scope.uploaderBatch.onAfterAddingAll = function (item) {
                $scope.filesStatus = $scope.uploaderBatch.queue.length;
            };

            $scope.setParentProject = (id) => {
                $scope.parentProject = _.find($scope.projects, (proj) => {
                    return proj._id === id;
                });
                console.log($scope.parentProject);
            };

            $scope.$watch(() => $scope.init, (newVal) => {
                console.log("$scope.init", newVal);
                if(newVal) {
                    delete $scope.activeProject;
                    $scope.activeProject = angular.copy($scope.init);
                    $scope.activeProject.date = new Date($scope.init.date);
                    $scope.setParentProject(newVal.parentProjectId);
                } else {
                    $scope.activeProject = {};
                    $scope.setParentProject();
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
                $scope.activeProject.parentProjectId = $scope.parentProject._id;
                console.log($scope.activeProject.parentProjectId, $scope.parentProject._id);
                $http.post('/adminium/addproject', $scope.activeProject)
                    .then(success, fail);
            }

            function update()  {
                $scope.activeProject.parentProjectId = $scope.parentProject._id;
                console.log($scope.activeProject.parentProjectId, $scope.parentProject._id);

                $http.put('/adminium/updateproject', $scope.activeProject)
                    .then(success, fail);
            }

            function success(data) {
                $scope.activeProject = {};
                $scope.setParentProject();
                dataService.init();
                viewService.highlightAdd();
                final();
                if(action === 'add' || action === 'update') {
                    uploadFiles(data.data._id);
                } else {
                    $scope.statusText = s200;
                    $scope.statusClassName = "label label-success";
                    $scope.isQueriing = false;
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
                }, 5000);
            }

            function uploadFiles(id) {
                $scope.uploaderSingle.onBeforeUploadItem = function (item) {
                    item.url = `${window.location.origin}/adminium/projectimg/${id}/main`;
                };
                $scope.uploaderBatch.onBeforeUploadItem = function (item) {
                    item.url = `${window.location.origin}/adminium/projectimg/${id}/gallery`;
                };
                $scope.uploaderSingle.uploadAll();
                $scope.uploaderBatch.uploadAll();
                $scope.filesStatus = 0;

                $scope.statusText = s200;
                $scope.statusClassName = "label label-success";
                $scope.isQueriing = false;
            }
        }
    }
})();