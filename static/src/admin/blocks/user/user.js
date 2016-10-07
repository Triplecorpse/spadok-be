(function() {
    angular.module('app').directive('spdaUser', ['$http', 'viewService', '$interval', '$timeout', 'dataService', directive]);

    function directive ($http, viewService, $interval, $timeout, dataService) {

        return {
            restrict: "E",
            templateUrl: "./admin/blocks/user/user.html",
            scope: {
                init: "=",
                view: "="
            },
            controller: ['$scope', 'FileUploader', controller]
        };

        function controller($scope, FileUploader) {
            var vm = this;
            var action;
            $scope.activeUser = {};

            $scope.uploaderAvatar = new FileUploader({
                removeAfterUpload: true
            });

            $scope.$watch(() => $scope.init, (newVal) => {
                if(newVal) {
                    $scope.activeUser = newVal;
                } else {
                    $scope.activeUser = {};
                }
            }, true);

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
                }

            };

            $scope.delete = () => {
                $http.delete(`/adminium/removeuser/${$scope.init._id}`)
                    .then((response) => {
                        success(response);
                        dataService.users = _.reject(dataService.users, (element) => {
                            return element._id === $scope.init._id;
                        });
                        $('.list-group-item').removeClass('active');
                    }, fail);
                action = 'delete';
            };

            function add() {
                $http.post('/adminium/adduser', $scope.activeUser)
                    .then((response) => {
                        success(response);
                        dataService.users.push(response.data);
                        $('.list-group-item').removeClass('active')
                    }, fail);
            }

            function update()  {
                $http.put('/adminium/updateuser', $scope.activeUser)
                    .then((response) => {
                        success(response);
                        dataService.users = _.map(dataService.users, (element) => {
                            if(element._id === $scope.init._id) {
                                element = $scope.init;
                            }
                            return element;
                        });
                        $('.list-group-item').removeClass('active')
                    }, fail);
            };

            function success(data) {
                alert('Operation completed successfully!');
                $scope.activeUser = {};
                $scope.isQueriing = false;
                $scope.canDelete = false;
                final();
                if(action === 'add' || action === 'update') {
                    uploadFiles(data.data._id);
                } else {
                    $scope.isQueriing = false;
                    dataService.init();
                }
                action = '';
                location.reload();
                return data;
            }

            function fail(data) {
                alert(`WARNING! Operation DID NOT completed successfully! Error ${data.status} ${data.statusText}`);
                final();
                return data;
            }

            function final() {
                $scope.isQueriing = false;
                $scope.canDelete = false;
            }

            function uploadFiles(id) {
                $scope.uploaderAvatar.onBeforeUploadItem = function (item) {
                    item.url = `${window.location.origin}/adminium/userimg/${id}`;
                };

                $scope.uploaderAvatar.onCompleteAll = function () {
                    dataService.init();
                };

                $scope.uploaderAvatar.uploadAll();
                $scope.filesStatus = 0;
            }
        }
    }
})();