(function() {
    angular.module('app').directive('spdaUser', ['$http', 'viewService', '$interval', '$timeout', 'dataService', 'translationService', directive]);

    function directive ($http, viewService, $interval, $timeout, dataService, translationService) {

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
            $scope.loggedUser = dataService.currentUser;

            $scope.languages = translationService.languages;
            $scope.activeLanguage = $scope.languages[0];
            $scope.langKeys = ['name', 'position'];


            $scope.uploaderAvatar = new FileUploader({
                removeAfterUpload: true
            });

            //$scope.$watch(() => $scope.activeUser.isInTeam, newVal => {
            $scope.phoneArrayBuilderOptions = {
                placeholder: 'Телефон'
            }
                //$scope.emailArrayBuilderOptions = {
                //    isDisabled: !newVal,
                //    placeholder: 'Email'
                //}
            //})

            $scope.$watch(() => $scope.activeUser.contacts, (newVal) => {
                console.log(newVal);
            }, true);

            $scope.$watch(() => $scope.init, (newVal) => {
                if(newVal) {
                    $scope.activeUser = angular.copy(newVal);
                    if ($scope.activeUser.contacts) {
                        //$scope.activeUser.contacts.emails = $scope.activeUser.contacts.emails || [''];
                        $scope.activeUser.contacts.phones = $scope.activeUser.contacts.phones || [''];
                    } else {
                        $scope.activeUser.contacts = {
                            phones: [''],
                            //emails: ['']
                        };
                    }
                } else {
                    $scope.activeUser = {
                        name: {},
                        position: {},
                        contacts: {
                            phones: [''],
                            //emails: ['']
                        }
                    };
                }
            }, true);

            // onClick handler for language buttons
            $scope.setLanguage = (code, event) => {
                $scope.activeLanguage = _.find($scope.languages, (language) => {
                    return language.code === code;
                });
                $('.lng-select').removeClass('active');
                event.currentTarget.classList.add('active');
            }

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
                //location.reload();
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