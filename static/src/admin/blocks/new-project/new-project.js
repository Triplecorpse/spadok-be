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
            var action;
            $scope.isTranslationQuerying = false;
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
            };

            //filling fields
            $scope.$watch(() => $scope.init, (newVal) => {
                if(newVal) {
                    delete $scope.activeProject;
                    $scope.activeProject = angular.copy($scope.init);
                    $scope.activeProject.date = new Date($scope.init.date);
                    if(!$scope.activeProject.pictures) {
                        $scope.activeProject.pictures = [];
                        $scope.activeGalleryPicture = '';
                    }
                    $scope.activeProject.pictures.push('');
                    $scope.setParentProject(newVal.parentProjectId);
                } else {
                    $scope.activeProject = {pictures:['']};
                    $scope.activeGalleryPicture = '';
                    $scope.setParentProject();
                }
            }, true);

            $scope.updateSinglePicture = (index, url, inp) => {
                $scope.activeProject.pictures[index] = url;
                $scope.activeGalleryPicture = $scope.activeProject.pictures[index];
                //is last and has text
                if(index === $scope.activeProject.pictures.length - 1 && $scope.activeProject.pictures[$scope.activeProject.pictures.length - 1]) {
                    $scope.activeProject.pictures.push('');
                }
            };

            $scope.showSinglePicture = (index) => {
                $scope.activeGalleryPicture = $scope.activeProject.pictures[index];
            };

            //translate
            $scope.translate = (source, destination) => {
                if(!$scope.activeProject[destination]) {
                    $scope.isTranslationQuerying = true;
                    let translateKey = 'trnsl.1.1.20160717T115748Z.066b542dcedc588c.a7897a46c5abbcd39336bf34ae21a6ca70534fdd';
                    let translationQuery = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateKey}&lang=ru-en&text=${source}`;
                    $http.get(translationQuery)
                        .then((response) => {
                            $scope.activeProject[destination] = response.data.text[0];
                            $scope.isTranslationQuerying = false;
                        });
                }
            };

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
                action = 'delete';
                $http.delete(`/adminium/removeproject/${$scope.init._id}`)
                    .then(success, fail);
            };

            function add() {
                $scope.activeProject.parentProjectId = $scope.parentProject && $scope.parentProject._id;
                $http.post('/adminium/addproject', $scope.activeProject)
                    .then(success, fail);
            }

            function update()  {
                $scope.activeProject.parentProjectId = $scope.parentProject && $scope.parentProject._id;
                $http.put('/adminium/updateproject', $scope.activeProject)
                    .then(success, fail);
            }

            function success(data) {
                $scope.activeProject = {};
                $scope.setParentProject();
                viewService.highlightAdd();
                final();
                if(action === 'add' || action === 'update') {
                    uploadFiles(data.data._id);
                } else {
                    $scope.statusText = s200;
                    $scope.statusClassName = "label label-success";
                    $scope.isQueriing = false;
                    dataService.init();
                }
                action = '';
                //location.reload();
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

                if($scope.uploaderBatch.queue.length) {
                    $scope.uploaderBatch.onCompleteAll = function () {
                        dataService.init();
                    };
                } else {
                    $scope.uploaderSingle.onCompleteAll = function () {
                        dataService.init();
                    };
                }

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